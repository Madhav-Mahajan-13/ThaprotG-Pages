import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

// Fetch latest images
export const getImages = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT *
             FROM gallery
             ORDER BY created_at DESC` // Latest images first
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Search images by tag or description (search filter from body)
export const searchImages = async (req, res) => {
    const { query } = req.body; // Get the search query from the request body
    try {
        const result = await db.query(
            `SELECT *
             FROM gallery
             WHERE tag ILIKE $1 OR description ILIKE $1
             ORDER BY created_at DESC`, // Latest images first for search as well
            [`%${query}%`] // Use a parameterized query to prevent SQL injection
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error searching images:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
