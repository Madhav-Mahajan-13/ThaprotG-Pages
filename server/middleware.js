const jwt = require('jsonwebtoken');

export async function getUser(req,res,next){
    try {
        const verify = req.header('verify');

        const token = req.header('authToken')

        if(!token){
            return res.status(505).json({msg:"Invalid Token",success:false});
        }

        const data = await jwt.verify(token,process.env.sec_key);

        if(!data){
            return res.status(504).json({msg:"Invalid Token",success:false});
        }

        if(verify){
            return res.status(200).json({msg:"Token Good",success:true})
        }

        console.log(data);

        req.uid = data.id
        req.email = data.email
        req.body.email = data.email
        next();

    } catch (e) {
        return res.status(507).json({msg:e.message,success:false});
    }
}