import db from "../dbConnection.js";
import dotenv from "dotenv";
import fs from 'fs/promises';
import path from 'path';

dotenv.config();


export const createEvent=async(req,res)=>{
    try {
        const { title, img_description, link, status } = req.body;
        const imgpath = req.files?.image ? req.files.image[0].filename : null;

        // Input validation
        if (!title || !img_description||!status) {
            // If there's an uploaded image, delete it since we're not going to use it
            if (imgpath) {
                try {
                    await fs.unlink(path.join('uploads', imgpath));
                } catch (unlinkError) {
                    console.error("Error deleting unused image:", unlinkError);
                }
            }

            return res.status(400).json({
                success: false,
                message: "Title , status and image description are required"
            });
        }

        if (!imgpath) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const result = await db.query(
            `INSERT INTO event (title, imgpath, event_description, link, status) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, title, imgpath, img_description, link, status, created_at`,
            [title, "uploads/images"+imgpath, img_description, link, status ]
        );

        return res.status(201).json({
            success: true,
            message: "event item created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in creating event:", error);
        
        // If there's an error and an image was uploaded, delete it
        if (req.files?.image) {
            try {
                await fs.unlink(path.join('uploads', req.files.image[0].filename));
            } catch (unlinkError) {
                console.error("Error deleting image after failed upload:", unlinkError);
            }
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create Event item",
            error: error.message
        });
    }
}


export const showEvent=async(req,res)=>{
    try {
        const result = await db.query(
            `SELECT id, title, imgpath, event_description, link, status, updated_at 
             FROM event 
             ORDER BY updated_at DESC`
        );

        return res.status(200).json({
            success: true,
            message: "Event items retrieved successfully",
            data: result.rows
        });
    } catch (error) {
        console.error("Error in showevent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve event items",
            error: error.message
        });
    }
}

export const activeEvent=async(req,res)=>{
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required"
            });
        }

        const result = await db.query(
            `UPDATE Event 
             SET status = 'active', updated_at = CURRENT_TIMESTAMP 
             WHERE id = $1 
             RETURNING id, title, status, updated_at`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event item activated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in activeEvent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to activate Event item",
            error: error.message
        });
    }
}
export const suspendEvent=async(req,res)=>{
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required"
            });
        }

        const result = await db.query(
            `UPDATE Event 
             SET status = 'suspended', updated_at = CURRENT_TIMESTAMP 
             WHERE id = $1 
             RETURNING id, title, status, updated_at`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event item suspended successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in suspendEvent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to suspend Event item",
            error: error.message
        });
    }
}
export const deleteEvent=async(req,res)=>{
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Event ID is required"
            });
        }

        // First, get the image path before deleting the record
        const imageResult = await db.query(
            'SELECT imgpath FROM Event WHERE id = $1',
            [id]
        );

        if (imageResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event item not found"
            });
        }

        // Delete the record from the database
        const result = await db.query(
            `DELETE FROM Event WHERE id = $1 RETURNING *`,
            [id]
        );

        // Delete the associated image file
        const imagePath = imageResult.rows[0].imgpath;
        if (imagePath) {
            try {
                await fs.unlink(path.join('uploads', imagePath));
            } catch (unlinkError) {
                console.error("Error deleting image file:", unlinkError);
                // Continue with the response even if image deletion fails
            }
        }

        return res.status(200).json({
            success: true,
            message: "Event item deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in deleteEvent:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Event item",
            error: error.message
        });
    }
}