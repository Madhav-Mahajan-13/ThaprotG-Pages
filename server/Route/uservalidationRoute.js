import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { getUser } from '../middleware.js';
import db from '../dbConnection.js';
import crypto from 'crypto';

const router = express.Router();
const pool = db;

// Current date instance
const d = new Date();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.sender_email,
        pass: process.env.sender_pass
    }
});

// Register Route
router.post('/register',
    [
        body('name', "Enter Valid Name").isLength({ min: 3 }),
        body('email', "Enter Valid Email").isEmail(),
        body('password', "Enter Valid Password").isLength({ min: 8 }),
    ],
    async (req, res) => {
        let success = true;
        const errs = validationResult(req);

        if (!errs.isEmpty()) {
            success = false;
            return res.status(503).json({ msg: errs.array(), success: success });
        }

        try {
            pool.query(`SELECT email FROM users WHERE email='${req.body.email}'`, async (err, result) => {
                if (err) {
                    success = false;
                    return res.status(502).json({ msg: err, success: success });
                }
                if (result.rowCount !== 0) {
                    success = false;
                    return res.status(400).json({ msg: "User already Exists", success: success });
                }

                const salt = await bcrypt.genSalt(10);
                const securePass = await bcrypt.hash(req.body.password, salt);

                pool.query(`INSERT INTO users (id, name, email, password) VALUES (gen_random_uuid(), '${req.body.name}', '${req.body.email}', '${securePass}')`, (err) => {
                    if (err) {
                        success = false;
                        return res.status(501).json({ msg: err, success: success });
                    }

                    const payload = { email: req.body.email };
                    const token = jwt.sign(payload, process.env.sec_key, { expiresIn: '10m' });

                    return res.status(200).json({ msg: "User Created Successfully", authToken: token, success: success });
                });
            });
        } catch (err) {
            success = false;
            return res.status(500).json({ msg: err.message, success: success });
        }
    }
);

// Login Route
router.post('/login',
    [
        body('email', "Enter Valid Email").isEmail(),
        body('password', "Enter Valid Password Format").isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errs = validationResult(req);

        if (!errs.isEmpty()) {
            return res.status(503).json({ msg: errs.array()[0].msg, success: false });
        }

        try {
            pool.query(`SELECT * FROM users WHERE email='${req.body.email}'`, async (err, result) => {
                if (err) {
                    return res.status(502).json({ msg: err.message, success: false });
                }

                if (!result.rowCount) {
                    return res.status(400).json({ msg: "User does not exist", success: false });
                }

                const rows = result.rows[0];
                const passComp = await bcrypt.compare(req.body.password, rows.password);

                if (!passComp) {
                    return res.status(400).json({ msg: "Invalid Password", success: false });
                }

                if (rows.is_otp_verified) {
                    const data = { id: rows.id, type: rows.user_type };
                    const token = jwt.sign(data, process.env.sec_key);
                    return res.status(200).json({ authToken: token, success: true, otp: false, self: rows.id });
                }

                const payload = { email: rows.email };
                const token = jwt.sign(payload, process.env.sec_key, { expiresIn: "10m" });
                return res.status(200).json({ authToken: token, success: true, otp: true });
            });
        } catch (e) {
            return res.status(501).json({ msg: e.message, success: false });
        }
    }
);

// OTP Route
router.post('/OTP/:email', getUser, async (req, res) => {
    try {
        if (req.params['email'] !== req.body.email) {
            return res.status(500).json({ msg: "Invalid Token-Email Combination", success: false });
        }

        const otp = crypto.randomInt(100000, 999999);
        await pool.query(`DELETE FROM otp WHERE email='${req.body.email}'`);

        pool.query(`INSERT INTO otp (email, otp) VALUES ('${req.body.email}', '${otp}')`, async (err) => {
            if (err) {
                return res.status(404).json({ msg: err, success: false });
            }

            const info = await transporter.sendMail({
                from: process.env.sender_email,
                to: req.body.email,
                subject: "OTP for ThaProt-G",
                text: `Your OTP for ThaProt-G is ${otp}, valid for 5 minutes`
            });

            return res.status(200).json({ msg: info, success: true });
        });
    } catch (e) {
        return res.status(404).json({ msg: e.message, success: false });
    }
});

// Verify OTP Route
router.post('/verify/:email', async (req, res) => {
    try {
        const otp = req.body.otp;
        const email = req.params['email'];

        pool.query(`SELECT otp FROM otp WHERE email='${email}' AND CURRENT_TIMESTAMP < expires + INTERVAL '5 minute'`, async (err, result) => {
            if (err) {
                return res.status(404).json({ msg: err.message, success: false });
            }

            if (!result.rowCount) {
                return res.status(400).json({ msg: "OTP not found", success: false });
            }

            const res_otp = result.rows[0].otp;

            if (otp == res_otp) {
                if (req.forgot) {
                    return res.status(200).json({ msg: "Verified", success: true, forgot: true });
                }

                await pool.query(`UPDATE users SET is_otp_verified = true WHERE email = '${email}'`, (err) => {
                    if (err) {
                        return res.status(404).json({ msg: err.message, success: false });
                    }

                    return res.status(200).json({ msg: "OTP verified", success: true });
                });
            } else {
                return res.status(400).json({ msg: "Incorrect OTP", success: false });
            }
        });
    } catch (e) {
        return res.status(404).json({ msg: e.message, success: false });
    }
});

// Export router
export default router;
