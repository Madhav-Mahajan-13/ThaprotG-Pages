import { getUser } from '../middleware.js';
import db from '../dbConnection.js';
import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailer from 'nodemailer';
import crypto from 'crypto';
import rateLimit from "express-rate-limit";

// Rate limiter (max 5 OTP requests per 10 minutes per IP)
const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: process.env.otp_limits,
    message: { msg: "Too many OTP requests. Try again later.", success: false },
  });

const router = express.Router();
const d = new Date();

const transporter = mailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: process.env.production == true,
    auth: {
        user: process.env.sender_email,
        pass: process.env.sender_pass,
    },
});

const generateTimeStamp = () => Math.floor(Date.now() / 1000);
const generateRandomDigits = (length) => Math.random().toString().slice(2, 2 + length);

router.post('/register',
    [
        body('name', "Enter Valid Name").isLength({ min: 3 }),
        body('email', "Enter Valid Email").isEmail(),
        body('password', "Enter Valid Password").isLength({ min: 8 }),
        body('degree', 'Not a valid degree').toLowerCase().isIn(['be', 'btech', 'mtech', 'ba', 'bca', 'mca', 'diploma', 'me', 'mba', 'bba', 'bsc', 'phd', 'ma']),
        body('year', "Enter valid year").isNumeric({ min: 1949, max: d.getFullYear() + 10 }),
    ],
    async (req, res) => {
        let success = true;
        const errs = validationResult(req);

        if (!errs.isEmpty()) {
            success = false;
            return res.status(503).json({ msg: errs.array(), success: success });
        }

        try {
            db.query(`select email from users where email='${req.body.email}'`, async (err, result) => {
                if (err) {
                    success = false;
                    res.status(502).json({ msg: err, success: success });
                }
                else {
                    if (result.rowCount != 0) {
                        success = false;
                        return res.status(400).json({ msg: "User already Exists", success: success });
                    }
                    else {
                        const first_name = req.body.name.split(" ")[0];
                        const last_name = req.body.name.split(" ")[1] ? req.body.name.split(" ")[1] : "" + req.body.name.split(" ")[2] ? req.body.name.split(" ")[2] : "";

                        const salt = await bcrypt.genSalt(10);
                        const securePass = await bcrypt.hash(req.body.password, salt);
                        
                        
                        // generate username
                        const timestamp = generateTimeStamp();
                        const randomDigits = generateRandomDigits(2);
                        const username = `${first_name}${timestamp}${req.body.degree}${randomDigits}`;

                        db.query(`insert into users(id2,first_name,last_name,email,degree,graduation_year,password,username) values(gen_random_uuid(),'${first_name}','${last_name}','${req.body.email}','${req.body.degree}',${req.body.year},'${securePass}','${username}')`, (err, result) => {
                            if (err) {
                                success = false;
                                console.log("ERROR\n");
                                return res.status(501).json({ msg: err, success: success });
                            }
                            else {
                                const payload = {
                                    email: req.body.email,
                                };

                                const token = jwt.sign(payload, process.env.sec_key, { expiresIn: '10m' });

                                res.cookie('authToken', token, {
                                    httpOnly: true,    // Prevents JavaScript access
                                    secure: process.env.production == true, // Use secure cookies in production
                                    sameSite: 'Strict', // Prevents CSRF
                                    maxAge: 10 * 60 * 1000, // 10 minutes
                                });

                                return res.status(200).json({ msg: "User Created Successfully", authToken: token, success: success });
                            }
                        });
                    }
                }
            });
        } catch (err) {
            success = false;
            console.log("ERROR\n");
            return res.status(500).json({ msg: err.message, success: success });
        }
    });

router.post('/login', [
        body('email', "Enter a valid email").isEmail(),
        body("password", "Password must be at least 8 characters").isLength({ min: 8 })
    ], async (req, res) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            return res.status(400).json({ msg: errs.array(), success: false });
        }
    
        try {
            const { email, password } = req.body;
    
            // Use parameterized query to prevent SQL Injection
            const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    
            if (result.rows.length === 0) {
                return res.status(400).json({ msg: "User does not exist", success: false });
            }
    
            const user = result.rows[0];
            if(user.suspended){
                return res.status(400).json({ msg: "User Is Suspended", success: false });
            }
            // Compare passwords
            const passComp = await bcrypt.compare(password, user.password);
            if (!passComp) {
                return res.status(400).json({ msg: "Invalid Password", success: false });
            }
    
            if (user.otp_verified) {
                // User is verified, generate authentication token
                const data = {
                    id: user.id2,
                    type: user.user_type
                };
    
                const token = jwt.sign(data, process.env.sec_key);
    
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: process.env.production == true,
                    sameSite: 'Strict',
                    maxAge: 60 * 60 * 1000 // 1 hour
                });
    
                return res.status(200).json({ success: true, otp: false, id: user.id2, is_alum: user.user_type === 'alum' });
            } else {
                // User is not verified, generate OTP token
                const otpToken = jwt.sign({ email: user.email }, process.env.sec_key, { expiresIn: "10m" });
    
                res.cookie('authToken', otpToken, {
                    httpOnly: true,
                    secure: process.env.production == true,
                    sameSite: 'Strict',
                    maxAge: 5 * 60 * 1000 // 5 minutes
                });
    
                return res.status(200).json({ success: true, otp: true });
            }
        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ msg: "Internal Server Error", success: false });
        }
});
    
router.post("/otp/:email", otpLimiter, async (req, res) => {
    try {
      const email = req.params.email;
  
      console.log("Processing OTP request for:", email);
  
      const otp = crypto.randomInt(100000, 999999);
  
      // Remove any expired OTPs
      await db.query(`DELETE FROM otp WHERE email = $1 AND otp_expires < NOW()`, [email]);
  
      // Delete any existing OTPs for this email
      await db.query(`DELETE FROM otp WHERE email = $1`, [email]);
  
      // Insert new OTP with expiration (valid for 5 minutes)
      await db.query(
        `INSERT INTO otp (email, otp, otp_expires) VALUES ($1, $2, NOW() + INTERVAL '5 minutes')`,
        [email, otp]
      );
  
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.sender_email,
        to: email,
        subject: "OTP for ThaProt-G",
        text: `Your OTP for ThaProt-G is ${otp}. This code is valid for 5 minutes.`,
      });
  
      return res.status(200).json({ msg: "OTP sent successfully", success: true });
  
    } catch (e) {
      console.error("OTP Error:", e.message);
      return res.status(500).json({ msg: "Internal server error", success: false });
    }
  });



router.post("/verify/:email", async (req, res) => {
    try {
        const { otp } = req.body;
        const email = req.params.email;

        if (!otp) {
            return res.status(400).json({ msg: "OTP is required", success: false });
        }

        // Remove expired OTPs before checking
        await db.query(`DELETE FROM otp WHERE otp_expires < NOW()`);

        // Retrieve the stored OTP for the email
        const { rows } = await db.query(`SELECT otp FROM otp WHERE email = $1`, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ msg: "Invalid or expired OTP", success: false });
        }

        const storedOtp = rows[0].otp;
        const isMatch = storedOtp == otp;
        // Compare the hashed OTP securely
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect OTP", success: false });
        }

        // Begin transaction for deleting OTP and updating user status
        await db.query("BEGIN");

        await db.query(`DELETE FROM otp WHERE email = $1`, [email]);
        await db.query(`UPDATE users SET otp_verified = true WHERE email = $1`, [email]);

        await db.query("COMMIT");

        return res.status(200).json({ msg: "Verification successful", success: true });

    } catch (error) {
        await db.query("ROLLBACK");
        console.error("OTP Verification Error:", error.message);
        return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
});

router.post('/verifyToken', getUser, (req, res) => {
    return res.status(200).json({ success: true, id: req.uid,user_type:req.type });
});

router.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required", success: false });
        }

        // Check if the user exists
        const { rowCount } = await db.query(`SELECT email FROM users WHERE email = $1`, [email]);
        if (!rowCount) {
            return res.status(400).json({ msg: "User does not exist", success: false });
        }

        // Generate a secure 6-digit OTP
        const otp = crypto.randomInt(100000, 999999);

        // Store OTP in the database with an expiration time (5 minutes)
        await db.query(
            `INSERT INTO otp (email, otp, otp_expires) 
             VALUES ($1, $2, NOW() + INTERVAL '5 minutes') 
             ON CONFLICT (email) DO UPDATE 
             SET otp = $2, otp_expires = NOW() + INTERVAL '5 minutes'`,
            [email, otp]
        );

        // Generate a one-time-use JWT for verification (OTP Token)
        const otpToken = jwt.sign({ email, otp }, process.env.sec_key, { expiresIn: "10m" });

        // Send OTP via email (Implement email sending logic)
        await transporter.sendMail({
            from: process.env.sender_email,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
        });

        return res.status(200).json({
            msg: "OTP sent successfully",
            otpToken, // This is the token the user needs to verify
            success: true,
        });

    } catch (error) {
        console.error("Forgot Password Error:", error.message);
        return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
});

router.post('/reset', async (req, res) => {
    try {
        const { email, pass,authToken } = req.body;

        if(!authToken){
            return res.status(401).json({ msg: "Authentication required", success: false });
        }

        const data = await jwt.verify(authToken, process.env.sec_key);
        if (!data) {
            return res.status(403).json({ msg: "Invalid Token", success: false });
          }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(pass, salt);

        db.query(`update users set password='${securePass}' where email='${email}'`, (err, result) => {
            if (err) {
                return res.status(500).json({ msg: err.message, success: false });
            }

            return res.status(200).json({ msg: "Updated Successfully", success: true });
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message, success: false });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.production == true,
        sameSite: 'Strict',
    });
    return res.status(200).json({ success: true, msg: "Logged out successfully" });
});

export default router;