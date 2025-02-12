import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const showCarousel = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id, title, img_description, image_path, link  
            FROM carousel 
            WHERE status = 'active'
        `);
        
        res.status(200).json({ count: result.rowCount, data: result.rows }); 
    } catch (error) {
        console.error("Error fetching carousel data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const showEvent = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id, title, imgpath, event_description, link
            FROM event 
            WHERE status = 'active'
        `);
        
        res.status(200).json({ count: result.rowCount, data: result.rows });
    } catch (error) {
        console.error("Error fetching event data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
