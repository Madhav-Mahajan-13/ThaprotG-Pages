import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();


export const getAlumProjects = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT project_id, user_id, description, title, openings, technology 
             FROM projects 
             WHERE project_by = 1 
             ORDER BY created_at DESC`
        );
        // if(!result) res.send("null")
        // Send the rows as a JSON response
        res.status(400).json(result.rows);
    } catch (error) {
        console.error("Error fetching alumni projects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const searchProjects = async (req, res) => {
    try {
        const { query } = req.body; // Extract the search query from the request body

        if (!query) {
            return res.status(400).json({ message: "Search query is required." });
        }

        // Execute the search query
        const result = await db.query(
            `SELECT project_id, user_id, description, title, openings, technology
             FROM projects
             WHERE 
                project_by= 1 and
                LOWER(technology) LIKE LOWER($1) OR
                LOWER(title) LIKE LOWER($1) OR
                LOWER(description) LIKE LOWER($1)
             ORDER BY created_at DESC`,
            [`%${query}%`] // Use parameterized query to prevent SQL injection
        );

        // Return the search results
        res.json(result.rows);
    } catch (error) {
        console.error("Error searching projects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


