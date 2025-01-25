import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const postProject = async (req, res) => {
    try {
        const { id, title, description, openings, technology, openUntil } = req.body;

        // Handle file uploads
        const pdfPath = req.files?.pdf ? req.files.pdf[0].filename : null;
        const imagePath = req.files?.image ? req.files.image[0].filename : null;

        // Validate user type
        const userTypeResult = await db.query(
            'SELECT user_type FROM users WHERE id2 = $1',
            [id]
        );

        if (userTypeResult.rows.length === 0 || !userTypeResult.rows[0].user_type) {
            return res.status(403).json({ error: 'User type validation failed' });
        }

        // Format technology array for PostgreSQL
        const techArray = Array.isArray(technology) 
            ? technology 
            : technology 
                ? technology.split(',').map(tech => tech.trim())
                : [];

        // Properly format technology for PostgreSQL
        const formattedTechnology = techArray.length 
            ? `{${techArray.map(t => `"${t}"`).join(',')}}` 
            : null;

            // console.log("image path ",imagePath)
        // Check user type and prepare query

        const userType = userTypeResult.rows[0].user_type;
        let insertResult; // Change 'const' to 'let'

        if (userType === 'student') {
            insertResult = await db.query(`
                INSERT INTO projects 
                (user_id, title, description, open_until, openings, technology, pdf_path, image_path)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING project_id;
            `,[
                id,
                title,
                description,
                openUntil,
                openings,
                formattedTechnology,
                pdfPath,
                imagePath
            ]);
        } else if (userType === 'alumni') {
            const status = "alumni";
            insertResult = await db.query(`
                INSERT INTO projects 
                (user_id, title, description, open_until, openings, technology, pdf_path, image_path, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING project_id;
            `,[
                id,
                title,
                description,
                openUntil,
                openings,
                formattedTechnology,
                pdfPath,
                imagePath,
                status
            ]);
        } else {
            return res.status(403).json({ error: 'Only students and alumni can post projects' });
        }

        // Execute the query
      

        res.status(201).json({
            message: 'Project posted successfully',
            projectId: insertResult.rows[0].project_id
        });
    } catch (error) {
        console.error('Project posting error:', error);
        res.status(500).json({
            error: 'Failed to post project',
            details: error.message
        });
    }
};