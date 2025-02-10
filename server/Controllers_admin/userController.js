import db from "../dbConnection.js";
import dotenv from "dotenv";


dotenv.config();

export const getAllUsers = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                u.id2,
                u.first_name, 
                u.last_name, 
                u.username, 
                u.email, 
                u.personal_email,  -- Added personal_email
                u.user_type, 
                u.graduation_year, 
                u.profile_picture, 
                u.suspended, 
                u.degree, 
                u.otp_verified, 
                u.phone_number, 
                u.additional_phone_number, 
                u.linkedin_url,
                COUNT(p.user_id) AS project_count
            FROM users u
            LEFT JOIN projects p ON u.id2 = p.user_id
            GROUP BY u.id2;
        `);

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            user_count: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching users",
            error: error.message
        });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { username, first_name, last_name, user_type, email, personal_email, graduation_year, suspended, degree, otp_verified } = req.body;

        let query = `
            SELECT 
                u.id2,
                u.first_name, 
                u.last_name, 
                u.username, 
                u.email, 
                u.personal_email,  -- Added personal_email
                u.user_type, 
                u.graduation_year, 
                u.profile_picture, 
                u.suspended, 
                u.degree, 
                u.otp_verified, 
                u.phone_number, 
                u.additional_phone_number, 
                u.linkedin_url,
                COUNT(p.user_id) AS project_count
            FROM users u
            LEFT JOIN projects p ON u.id2 = p.user_id
            WHERE 1=1
        `;

        const values = [];
        let index = 1;

        if (username) {
            query += ` AND u.username ILIKE $${index}`;
            values.push(`%${username}%`);
            index++;
        }
        if (first_name) {
            query += ` AND u.first_name ILIKE $${index}`;
            values.push(`%${first_name}%`);
            index++;
        }
        if (last_name) {
            query += ` AND u.last_name ILIKE $${index}`;
            values.push(`%${last_name}%`);
            index++;
        }
        if (user_type) {
            query += ` AND u.user_type = $${index}`;
            values.push(user_type);
            index++;
        }
        if (email) {
            query += ` AND u.email ILIKE $${index}`;
            values.push(`%${email}%`);
            index++;
        }
        if (personal_email) {
            query += ` AND u.personal_email ILIKE $${index}`;
            values.push(`%${personal_email}%`);
            index++;
        }
        if (graduation_year) {
            query += ` AND u.graduation_year = $${index}`;
            values.push(graduation_year);
            index++;
        }
        if (suspended !== undefined) {
            query += ` AND u.suspended = $${index}`;
            values.push(suspended);
            index++;
        }
        if (degree) {
            query += ` AND u.degree ILIKE $${index}`;
            values.push(`%${degree}%`);
            index++;
        }
        if (otp_verified !== undefined) {
            query += ` AND u.otp_verified = $${index}`;
            values.push(otp_verified);
            index++;
        }

        query += ` GROUP BY u.id2;`;

        const result = await db.query(query, values);

        res.status(200).json({
            userCount: result.rowCount,
            users: result.rows,
        });

    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const activeUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const result = await db.query(
            `UPDATE users SET suspended = false WHERE id2 = $1 RETURNING *`, 
            [user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User activated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Error activating user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const suspendUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const result = await db.query(
            `UPDATE users SET suspended = true WHERE id2 = $1 RETURNING *`, 
            [user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User suspended successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("Error suspending user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const result = await db.query(
            `DELETE FROM users WHERE id2 = $1 RETURNING *`, 
            [user_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUser: result.rows[0]
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


