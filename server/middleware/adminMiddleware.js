// const jwt  = require('jsonwebtoken');
import jwt from "jsonwebtoken";
const verifyToken = async (req,res,next) => {
    try {
        const token = req.cookies.token
        console.log(token);
        if(!token){
            console.log("COOKIE NOT FOUND");
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"

            })
        }

        const data = await jwt.decode(token,process.env.sec_key);
        if(!data){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }

        req.user_type = data.type

        next();

    } catch (e) {
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

export default verifyToken