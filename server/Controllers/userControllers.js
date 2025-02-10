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
    const { firstName, lastName, email, graduation_year, bio } = req.body; // Extract data from request body
    const imagePath = req.files?.image ? req.files.image[0].filename : null;
    try {
        const result = await db.query(
            `UPDATE users
             SET first_name = $1, last_name = $2, email = $3, graduation_year = $4, bio = $5, updated_at = CURRENT_TIMESTAMP,profile_picture=$7
             WHERE id2 = $6 RETURNING *`,
            [firstName, lastName, email, graduation_year, bio, userId,"/uploads/images/"+imagePath]
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


export const searchUser = async (req, res) => {
    try {
        const { query } = req.params;

        if (!query || query.trim() === "") {
            return res.status(400).json({ success: false, msg: "Query parameter is required" });
        }

        const result = await db.query(
            `SELECT * FROM users 
             WHERE LOWER(first_name) LIKE LOWER($1) 
             OR LOWER(email) LIKE LOWER($1) 
             OR LOWER(last_name) LIKE LOWER($1)`, 
            [`%${query}%`]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({ success: true, data: [], msg: "No users found" });
        }

        res.status(200).json({ success: true, data: result.rows });
    } catch (e) {
        console.error("Error querying users:", e.message);
        res.status(500).json({ msg: e.message, success: false });
    }
};



export const getUserInfo = async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch user info
        const userQuery = `
            SELECT first_name, last_name, email, graduation_year, 
                   profile_picture, bio, suspended, degree, linkedin_url 
            FROM users 
            WHERE username = $1
        `;
        const userResult = await db.query(userQuery, [username]);

        // If user not found, return 404
        if (userResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch user's projects
        const projectsQuery = `
            SELECT 
                p.project_id,
                p.title,
                p.description,
                p.open_until,
                p.status,
                p.technology,
                p.image_path,
                p.openings,
                p.pdf_path
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE u.username = $1
            ORDER BY p.updated_at DESC
        `;
        const projectsResult = await db.query(projectsQuery, [username]);

        // Send response with user info & projects
        res.status(200).json({
            success: true,
            message: "User info retrieved successfully",
            user: userResult.rows[0],
            projects: projectsResult.rows
        });

    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
