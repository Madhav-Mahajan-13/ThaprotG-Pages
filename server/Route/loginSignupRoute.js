const db = require('../dbConnection')
const express = require('express')
const bcrypt = require('bcrypt')
const mailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')
const { getUser } = require('../middleware')

const router = express.Router()

var d = new Date();

const pool = db;

const transporter = mailer.createTransport({
    service:"Gmail",
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.sender_email,
        pass:process.env.sender_pass
    }
});

router.post('/register',
    [
    body('name',"Enter Valid Name").isLength({min:3}),
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Enter Valid Password").isLength({min:8}),
    ],
    async(req,res) => {
        let success = true
        const errs = validationResult(req);

        if(!errs.isEmpty()){
            success = false;
            return res.status(503).json({msg:errs.array(),success:success});
        }

        try {
            pool.query(`select email from users where email='${req.body.email}'`,async (err,result) => {
                if(err){
                    success = false
                    res.status(502).json({msg:err,success:success})
                }
                else{
                    if(result.rowCount !=0){
                        success = false;
                        return res.status(400).json({msg:"User already Exists",success:success});
                    }
                    else{
                        
                        const salt = await bcrypt.genSalt(10);
                        const securePass = await bcrypt.hash(req.body.password,salt);

                        pool.query(`insert into users(id,name,email,password) values(gen_random_uuid(),'${req.body.name}','${req.body.email}','${securePass}')`,(err,result) => {
                            if(err){
                                success = false
                                return res.status(501).json({msg:err,success:success})
                            }
                            else{
                                const payload = {
                                    email : req.body.email
                                }

                                const token = jwt.sign(payload,process.env.sec_key,{expiresIn:'10m'});

                                return res.status(200).json({msg:"User Created Successfully",authToken:token,success:success});
                            }
                        })
                    }
                }
            });
        } catch (err) {
            success = false;
            return res.status(500).json({msg:err.message,success:success,bruh:'moment'});
        }
})

router.post('/login',[
    body('email',"Enter Valid Email").isEmail(),
    body("password","Enter Valid Password Format").isLength({min:8})
    ],async (req,res) => {
        const errs = validationResult(req);
        if(!errs.isEmpty()){
            return res.status(503).json({"msg":errs.array()[0].msg,success:false});
        }

        console.log(req.body)

        try {
            pool.query(`select * from users where email='${req.body.email}'`,async (err,result) => {
                if(err){
                    return res.status(502).json({"msg":err.message,"success":false})
                }

                if(!result.rowCount){
                    return res.status(400).json({"msg":"User does not exist","success":false});
                }

                const rows = result.rows[0];

                const pass = req.body.password;

                const passComp = await bcrypt.compare(pass,rows.password);

                if(!passComp){
                    return res.status(400).json({"msg":"Invalid Password",success:false});
                }

                if(rows.is_otp_verified){
                    const data = {
                        id:rows.id,
                        type:rows.user_type
                    }
    
                    const payload = await jwt.sign(data,process.env.sec_key);
    
                    return res.status(200).json({authToken:payload,success:true,otp:false,self:rows.id});
                }

                else{
                    const data = {
                        email : rows.email
                    }

                    const payload  = await jwt.sign(data,process.env.sec_key,{expiresIn:"10m"});

                    return res.status(200).json({authToken:payload,success:true,otp:true});

                }

                

            })
        }catch(e){
            return res.status(501).json({"msg":e.message,success:false});
        }
})

router.post('/OTP/:email',getUser,async (req,res) => {
    try {
        if(req.params['email'] !== req.body.email){
            return res.status(500).json({msg:"Invalid Token-Email Combination",success:false})
        }

        const otp = crypto.randomInt(100000,999999);
    
        await pool.query(`delete from otp where email='${req.body.email}'`);

        pool.query(`insert into otp(email,otp) values('${req.body.email}','${otp}')`,async (err,result) =>{
            if(err){
                return res.status(404).json({msg:err,success:false});
            }

            const info = await transporter.sendMail({
                from:process.env.sender_email,
                to:req.body.email,
                subject:"OTP for ThaProt-G",
                text:`Your OTP for ThaProt-G is ${otp} , valid for 5 minutes`
            })

            return res.status(200).json({msg:info,success:true})
        })

    } catch (e) {
        return res.status(404).json({msg:e.message,success:false})
    }
})

router.post('/verify/:email',async (req,res) => {
    try {
        const otp = req.body.otp;
        const email = req.params['email'];

        pool.query(`select otp from otp where email='${email}' and CURRENT_TIMESTAMP < expires + INTERVAL '5 minute'`,async (err,result) => {
            if(err){
                return res.status(404).json({msg:err.message,success:false});
            }

            if(!result.rowCount){
                return res.status(400).json({msg:"OTP not found",success:false});
            }

            const res_otp = result.rows[0].otp;

            console.log(req.forgot)

            if(otp == res_otp){
                if(req.forgot){
                    return res.status(200).json({msg:"Verified",success:true,forgot:true})
                }
                await pool.query(`update users set is_otp_verified=true where email='${email}'`,async (err,result) => {
                    if(err){
                        return res.status(404).json({msg:err.message,success:false});
                    }

                    return res.status(200).json({msg:"OTP verified",success:true});
                    
                })
            }
            else{
                return res.status(400).json({msg:"Incorrect OTP",success:false})
            }
        })
    } catch (e) {
            return res.status(404).json({msg:e.message,success:false});
    }
})

router.post('/verifyToken',getUser)

router.post('/forgot',async (req,res) => {
    try {
        const email = req.body.email;

        pool.query(`select email from users where email='${email}'`,(err,result) => {
            if(err){
                return res.status(500).json({msg:err.message,success:false});
            }

            if(!result.rowCount){
                return res.status(400).json({msg:"User does not exist","success":false});
            }

            const data = {
                email : email,
                forgot : true
            }

            const token = jwt.sign(data,process.env.sec_key,{expiresIn:'10m'});
            return res.status(200).json({token:token,success:true});

        })
    } catch (error) {
        res.status(500).json({msg:error.message,success:false})
    }
})

router.post('/reset',getUser,async (req,res) =>{
    try {
        const {email,pass} = req.body;

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(pass,salt);

        pool.query(`update users set password='${securePass}' where email='${email}'`,(err,result)=>{
            if(err){
                return res.status(500).json({msg:err.message,success:false});
            }

            return res.status(200).json({msg:"Updated Successfully",success:true})

        })


    } catch (error) {
        return res.status(500).json({msg:error.message,success:false});
    }
})

router.get("/getalluser",async (req,res) => {
    try {
        pool.query('select * from users',(err,results) => {
            if(err){
                return res.status(500).json({msg:err.message,success:false});
            }

            const rows = results.rows;
            return res.status(200).json({users:rows,success:false});
        })
    } catch (e) {
        return res.status(500).json({msg:e.message,success:false})
    }
})

module.exports = router;