import db from "../dbConnection.js";
import dotenv from "dotenv";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mailer from 'nodemailer';
import jwt from 'jsonwebtoken';

dotenv.config();

// Configure nodemailer transporter
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

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'User ID and password are required'
            });
        }

        // First get the admin without checking password
        const query = `
            SELECT 
                email,
                password,
                type,
                name,
                status
            FROM admin 
            WHERE email = $1
        `;

        const result = await db.query(query, [email]);

        if (!result.rows || result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const admin = result.rows[0];

        // Verify password using bcrypt
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check account status
        if (admin.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Your account is suspended. Please contact the administrator for further details.',
                status: admin.status
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                user_id: admin.user_id,
                type: admin.type 
            },
            process.env.sec_key,
            { expiresIn: '24h' }
        );

        const adminResponse = {
            user_id: admin.user_id,
            name: admin.name,
            type: admin.type,
            status: admin.status
        };

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.production == true,
            SameSite :'None',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        })

        return res.status(200).json({
            success: true,
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during login. Please try again later.'
        });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const checkEmail = await db.query(
            'SELECT email FROM admin WHERE email = $1',
            [email]
        );

        if (!checkEmail.rows || checkEmail.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            });
        }

        const otp = crypto.randomInt(100000, 999999);

        // Store OTP in the database with an expiration time (5 minutes)
        await db.query(
            `INSERT INTO otp (email, otp, otp_expires) 
             VALUES ($1, $2, NOW() + INTERVAL '5 minutes') 
             ON CONFLICT (email) DO UPDATE 
             SET otp = $2, otp_expires = NOW() + INTERVAL '5 minutes'`,
            [email, otp]
        );

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
            html: `
                <h2>Password Reset Request</h2>
                <p>Your OTP for password reset is: <strong>${otp}</strong></p>
                <p>This OTP is valid for 5 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });

        return res.status(200).json({
            success: true,
            message: 'OTP has been sent to your email'
        });
        
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const result = await db.query(
            'SELECT * FROM otp WHERE email = $1 AND otp = $2 AND otp_expires > NOW()',
            [email, otp]
        );

        if (!result.rows || result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Delete the used OTP
        await db.query('DELETE FROM otp WHERE email = $1', [email]);

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while verifying OTP'
        });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Verify OTP first
        // const otpVerification = await db.query(
        //     'SELECT * FROM otp WHERE email = $1 AND otp = $2 AND otp_expires > NOW()',
        //     [email, otp]
        // );

        // if (!otpVerification.rows || otpVerification.rows.length === 0) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Invalid or expired OTP'
        //     });
        // }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the password
        const reset = await db.query(
            'UPDATE admin SET password = $1 WHERE email = $2 RETURNING user_id, email',
            [hashedPassword, email]
        );

        if (!reset.rows || reset.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        // Delete all OTPs for this email
        await db.query('DELETE FROM otp WHERE email = $1', [email]);

        return res.status(200).json({
            success: true,
            message: 'Password has been reset successfully'
        });

    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while resetting password'
        });
    }
};