import db from "../dbConnection.js";
import dotenv from "dotenv";
import { randomBytes } from 'crypto';

dotenv.config();

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
            `SELECT id, user_id, type, email, status, department FROM admin WHERE type = 'sub'`
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

        // Check if email already exists
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

        // Generate user_id
        const timestamp = generateTimeStamp();
        const randomDigits = generateRandomDigits(2);
        const user_id = `${name}${timestamp}${department}${randomDigits}`;

        // Generate password
        const password = generatePassword(name);

        const result = await db.query(
            `INSERT INTO admin (user_id, type, email, password, status, department,name) 
             VALUES ($1, $2, $3, $4, $5, $6,$7) 
             RETURNING id, user_id, email, department`,
            [user_id, 'sub', email, password, 'active', department,name]
        );

        return res.status(201).json({
            success: true,
            message: "Sub-admin created successfully",
            data: {
                ...result.rows[0],
                password: password // Include password in response so it can be communicated to the sub-admin
            }
        });
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