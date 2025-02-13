import db from "../dbConnection.js";
import dotenv from "dotenv";
import { randomBytes } from 'crypto';
import EmailVerifier from 'email-verifier';
import nodemailer from 'nodemailer';

dotenv.config();



// const verifier = new EmailVerifier({
//     verifyMailbox: true, // Enables mailbox verification
//     timeout: 5000 // Timeout in milliseconds
// });

// async function isEmailValid(email) {
//     return new Promise((resolve, reject) => {
//         verifier.verify(email, (err, info) => {
//             if (err) {
//                 console.error("Email verification error:", err);
//                 resolve(false); // Assume invalid if there's an error
//             } else {
//                 resolve(info.success); // Returns true if email exists
//             }
//         });
//     });
// }
// Helper function to generate random digits
const generateRandomDigits = (length) => {
    return Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
};

// Helper function to generate timestamp
const generateTimeStamp = () => {
    return Date.now().toString();
};

// Helper function to generate password
const generatePassword = (name) => {
    const namePrefix = name.slice(0, 4).toLowerCase();
    const randomNums = generateRandomDigits(6);
    return `${namePrefix}@${randomNums}arc`;
};

export const viewAllSubAdmin = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT name,id, user_id, type, email, status, department,created_at FROM admin WHERE type = 'sub'`
        );

        return res.status(200).json({
            success: true,
            message: "Sub-admins retrieved successfully",
            data: result.rows
        });
    } catch (error) {
        console.error("Error in viewAllSubAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve sub-admins",
            error: error.message
        });
    }
};



// Email template function
const generateEmailHTML = (name, user_id, password) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
        }
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            line-height: 1.6;
        }
        .credentials {
            background-color: #fff;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #4a90e2;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4a90e2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to ThaProt-G!</h1>
        </div>
        <div class="content">
            <h2>Congratulations ${name}!</h2>
            <p>You have been appointed as a Sub-Admin at ThaProt-G. We're excited to have you on board!</p>
            
            <div class="credentials">
                <h3>Your Login Credentials</h3>
                <p><strong>User ID:</strong> ${user_id}</p>
                <p><strong>Password:</strong> ${password}</p>
            </div>
            
            <p>Please keep these credentials safe and change your password upon first login.</p>
            
            <a href="www.google.com" class="button">Access ThaProt-G Portal</a>
            
            <p>If you have any questions or need assistance, please don't hesitate to contact the admin team.</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;

// Updated createSubAdmin function
export const createSubAdmin = async (req, res) => {
    try {
        const { email, department, name } = req.body;

        // Input validation
        if (!email || !department || !name) {
            return res.status(400).json({
                success: false,
                message: "Email, department, and name are required"
            });
        }

        // Validate Thapar institutional email
        if (!email.toLowerCase().endsWith('@thapar.edu')) {
            return res.status(400).json({
                success: false,
                message: "Please enter an official Thapar institutional email address (@thapar.edu)"
            });
        }

        // Verify if the email exists
        // const emailExists = await isEmailValid(email);
        // if (!emailExists) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid email address. This email does not exist."
        //     });
        // }

        // Check if email already exists in the database
        const existingAdmin = await db.query(
            'SELECT id FROM admin WHERE email = $1',
            [email]
        );

        if (existingAdmin.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Generate user_id - remove spaces from name
        const timestamp = generateTimeStamp();
        const randomDigits = generateRandomDigits(4);
        const cleanName = name.replace(/\s+/g, '');
        const user_id = `${cleanName}${timestamp}${department}${randomDigits}`;

        // Generate password
        const password = generatePassword(name);

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.sender_email,
                pass: process.env.sender_pass
            }
        });

        const mailOptions = {
            from: process.env.sender_email,
            to: email,
            subject: 'Welcome to ThaProt-G - Your Sub-Admin Credentials',
            html: generateEmailHTML(name, user_id, password)
        };

        try {
            // Send email first, then insert into DB
            const info = await transporter.sendMail(mailOptions);

            // If email fails to send, return an error
            if (!info.accepted || info.accepted.length === 0) {
                throw new Error("Email could not be delivered.");
            }

            // Start database transaction after email is successfully sent
            await db.query('BEGIN');

            // Double-check if the email still doesn't exist in the database
            const finalCheck = await db.query(
                'SELECT id FROM admin WHERE email = $1',
                [email]
            );

            if (finalCheck.rows.length > 0) {
                await db.query('ROLLBACK');
                return res.status(409).json({
                    success: false,
                    message: "Email already registered (Race condition handled)."
                });
            }

            const result = await db.query(
                `INSERT INTO admin (user_id, type, email, password, status, department, name) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING id, user_id, email, department`,
                [user_id, 'sub', email, password, 'active', department, name]
            );

            // Commit the transaction
            await db.query('COMMIT');

            return res.status(201).json({
                success: true,
                message: "Sub-admin created successfully and credentials sent via email",
                data: {
                    ...result.rows[0],
                    password: password
                }
            });

        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            return res.status(400).json({
                success: false,
                message: "Email delivery failed. Please check the email address.",
                error: emailError.message
            });
        }

    } catch (error) {
        console.error("Error in createSubAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create sub-admin",
            error: error.message
        });
    }
};



export const suspendSubAdmin = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const result = await db.query(
            `UPDATE admin SET status = 'suspended' WHERE user_id = $1 AND type = 'sub' RETURNING user_id, email, status`,
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Sub-admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-admin suspended successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in suspendSubAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to suspend sub-admin",
            error: error.message
        });
    }
};

export const activateSubAdmin = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const result = await db.query(
            `UPDATE admin SET status = 'active' WHERE user_id = $1 AND type = 'sub' RETURNING user_id, email, status`,
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Sub-admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-admin activated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in activateSubAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to activate sub-admin",
            error: error.message
        });
    }
};

// Additional helper function to get sub-admin details
export const getSubAdminDetails = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const result = await db.query(
            `SELECT id, user_id, email, status, department, created_at 
             FROM admin 
             WHERE user_id = $1 AND type = 'sub'`,
            [user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Sub-admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Sub-admin details retrieved successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in getSubAdminDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve sub-admin details",
            error: error.message
        });
    }
};


export const deleteSubAdmin = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // First check if the sub-admin exists and is actually a sub-admin
        const existingAdmin = await db.query(
            'SELECT email, type FROM admin WHERE user_id = $1',
            [user_id]
        );

        if (existingAdmin.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Sub-admin not found"
            });
        }

        // Verify this is actually a sub-admin
        if (existingAdmin.rows[0].type !== 'sub') {
            return res.status(403).json({
                success: false,
                message: "Cannot delete: specified user is not a sub-admin"
            });
        }

        // Delete the sub-admin
        const result = await db.query(
            `DELETE FROM admin WHERE user_id = $1 AND type = 'sub' RETURNING id, user_id, email, department`,
            [user_id]
        );

        return res.status(200).json({
            success: true,
            message: "Sub-admin deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in deleteSubAdmin:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete sub-admin",
            error: error.message
        });
    }
};