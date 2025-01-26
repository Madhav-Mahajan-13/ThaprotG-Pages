// server.js



import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params; // Retrieve user ID from the request
        const result = await db.query(
            `SELECT id2 AS user_id, first_name, last_name, email, user_type, graduation_year, 
            profile_picture, bio, suspended 
            FROM users WHERE id2 = $1`,
            [userId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUser = async (req, res) => {
    const { userId } = req.params; // Get user ID from route parameter
    const { firstName, lastName, email, dateOfGraduation, bio } = req.body; // Extract data from request body

    try {
        const result = await db.query(
            `UPDATE user_table 
             SET first_name = $1, last_name = $2, email = $3, date_of_graduation = $4, bio = $5, updated_at = CURRENT_TIMESTAMP
             WHERE id2 = $6 RETURNING *`,
            [firstName, lastName, email, dateOfGraduation, bio, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User updated successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


