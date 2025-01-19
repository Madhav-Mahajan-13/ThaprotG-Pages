// server.js



import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params; // Retrieve user ID from the request
        const result = await db.query(
            `SELECT id2 AS user_id, first_name, last_name, email, user_type, date_of_graduation, 
            profile_picture, bio, suspended 
            FROM user_table WHERE id2 = $1`,
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



