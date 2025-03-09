import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const addInsight = async (req, res) => {
    try {
        const { tag, description } = req.body;
        const images = req.files?.image ? req.files.image.map(file => file.filename) : [];

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required" });
        }

        // Insert data into DB for each image
        const insertedImages = [];
        for (const imgsrc of images) {
            const query = await db.query(
                `INSERT INTO gallery (tag, description, imgsrc) VALUES ($1, $2, $3) RETURNING *`,
                [tag, description, "uploads/images/"+imgsrc]
            );
            insertedImages.push(query.rows[0]);
        }

        res.status(201).json({ success: true, message: "Images uploaded successfully", data: insertedImages });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getAllInsights = async (req, res) => {
    try {
        const query = await db.query("SELECT * FROM gallery ORDER BY created_at DESC");
        res.status(200).json({ success: true, data: query.rows });
    } catch (error) {
        console.error("Error fetching insights:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};