const { getUser } = require('../middleware');
const Pool = require('pg').Pool;
const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require("nodemailer");
const crypto = require("crypto");

var d = new Date();

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

const pool = new Pool({
    user:process.env.dbUser,
    password:process.env.dbPass,
    host:process.env.dbHost,
    port:process.env.dbPort,
    database:process.env.database,
});

router.post('/register',
    [
    body('name',"Enter Valid Name").isLength({min:3}),
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Enter Valid Password").isLength({min:8}),
    body('degree','Not a valid degree').toLowerCase().isIn(['be','btech','mtech','ba','bca','mca','diploma','me','mba','bba','bsc','phd','ma']),
    body('year',"Enter valid year").isNumeric({min:1949,max:d.getFullYear()+10})
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
                        const first_name = req.body.name.split(" ")[0]
                        const last_name = req.body.name.split(" ")[1]?req.body.name.split(" ")[1]:"" + req.body.name.split(" ")[2]?req.body.name.split(" ")[2]:"" 
                        
                        const salt = await bcrypt.genSalt(10);
                        const securePass = await bcrypt.hash(req.body.password,salt);

                        pool.query(`insert into users(id2,first_name,last_name,email,degree,graduation_year,password) values(gen_random_uuid(),'${first_name}','${last_name}','${req.body.email}','${req.body.degree}',${req.body.year},'${securePass}')`,(err,result) => {
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
            return res.status(500).json({msg:errs.message,success:success});
        }
})

router.post('/login',[
    body('email',"Enter Valid Email").isEmail(),
    body("password","Enter Valid Password Format").isLength({min:8})
    ],async (req,res) => {
        const errs = validationResult(req);
        if(!errs.isEmpty()){
            return res.status(503).json({"msg":errs.array(),success:false});
        }

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

                if(rows.otp_verified){
                    const data = {
                        id:rows.id2,
                        type:rows.user_type
                    }
    
                    const payload = await jwt.sign(data,process.env.sec_key);
    
                    return res.status(200).json({authToken:payload,success:true,otp:false});
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

router.post('/otp/:email',getUser,async (req,res) => {
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

        pool.query(`select otp from otp where otp_expires < current_timestamp + (5 * interval '1 minute') and email='${req.params['email']}'`,async (error,result) => {
            if(error){
                return res.status(501).json({msg:error.message,success:false});
            }

            if(!result.rowCount){
                return res.status(502).json({msg:"No OTP found",success:false});
            }

            if(otp == result.rows.otp){
                pool.query(`delete from otp where email='${req.params['email']}'`,(error,result) =>{
                    if(error){
                        return res.status(502).json({msg:error.message,success:false});
                    }

                    pool.query(`update users set otp_verified = true where email = '${req.params['email']}'`,(error,result) => {
                        if(error){
                            return res.status(503).json({msg:error.message,success:false});
                        }
                        
                        return res.status(200).json({msg:"Verification Successfull",success:true})

                    });  
                })
            }
        })
    }catch(error){
        return res.status(400).json({msg:error.message,success:false});
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

router.post('/reset',async (req,res) =>{
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

module.exports = router;