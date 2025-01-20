import { getUser } from '../middleware';
const {body,validationResult} = require('express-validator');

export const router = express.router();

router.post('/login',[
    body('email',"Enter Valid Email").isEmail(),
    body("password","Enter Valid Password Format").isLength({min:8})
    ],
    userLogin
);

router.post('/register',[
    body('name',"Enter Valid Name").isLength({min:3}),
    body('email',"Enter Valid Email").isEmail(),
    body('password',"Enter Valid Password").isLength({min:8}),
    body('degree','Not a valid degree').toLowerCase().isIn(['be','btech','mtech','ba','bca','mca','diploma','me','mba','bba','bsc','phd','ma']),
    body('year',"Enter valid year").isNumeric({min:1949,max:d.getFullYear()+10})
    ],
    userRegister
);

router.post('/otp/:email',getUser,otpSender);

router.post('/verify/:email',verifyOTP);

router.post('verifyToken',getUser);

router.post('/forgot',forgotPass);

router.post('/reset',resetPass);