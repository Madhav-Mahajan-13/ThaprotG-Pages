import db from "../dbConnection.js";
import dotenv from "dotenv";
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

export const showCarousel = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT id, title, image_path, img_description, link, status, updated_at 
             FROM carousel 
             ORDER BY updated_at DESC`
        );

        return res.status(200).json({
            success: true,
            message: "Carousel items retrieved successfully",
            data: result.rows
        });
    } catch (error) {
        console.error("Error in showCarousel:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve carousel items",
            error: error.message
        });
    }
};

export const createCarousel = async (req, res) => {
    try {
        const { title, img_description, link, status } = req.body;
        const image_path = req.files?.image ? req.files.image[0].filename : null;

        // Input validation
        if (!title || !img_description||!status) {
            // If there's an uploaded image, delete it since we're not going to use it
            if (image_path) {
                try {
                    await fs.unlink(path.join('uploads', image_path));
                } catch (unlinkError) {
                    console.error("Error deleting unused image:", unlinkError);
                }
            }

            return res.status(400).json({
                success: false,
                message: "Title,Status and image description are required"
            });
        }

        if (!image_path) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const result = await db.query(
            `INSERT INTO carousel (title, image_path, img_description, link, status) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, title, image_path, img_description, link, status, created_at`,
            [title, "uploads/images/"+image_path, img_description, link, status ]
        );

        return res.status(201).json({
            success: true,
            message: "Carousel item created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in createCarousel:", error);
        
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
            message: "Failed to create carousel item",
            error: error.message
        });
    }
};

export const activeCarousel = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Carousel ID is required"
            });
        }

        const result = await db.query(
            `UPDATE carousel 
             SET status = 'active', updated_at = CURRENT_TIMESTAMP 
             WHERE id = $1 
             RETURNING id, title, status, updated_at`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Carousel item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Carousel item activated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in activeCarousel:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to activate carousel item",
            error: error.message
        });
    }
};

export const suspendCarousel = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Carousel ID is required"
            });
        }

        const result = await db.query(
            `UPDATE carousel 
             SET status = 'suspended', updated_at = CURRENT_TIMESTAMP 
             WHERE id = $1 
             RETURNING id, title, status, updated_at`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Carousel item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Carousel item suspended successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in suspendCarousel:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to suspend carousel item",
            error: error.message
        });
    }
};

// Additional helper function to update carousel item
export const updateCarousel = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, img_description, link, status } = req.body;
        const image_path = req.files?.image ? req.files.image[0].filename : null;

        if (!id) {
            if (image_path) {
                try {
                    await fs.unlink(path.join('uploads', image_path));
                } catch (unlinkError) {
                    console.error("Error deleting unused image:", unlinkError);
                }
            }
            return res.status(400).json({
                success: false,
                message: "Carousel ID is required"
            });
        }

        // Get existing carousel item
        const existing = await db.query(
            'SELECT image_path FROM carousel WHERE id = $1',
            [id]
        );

        if (existing.rows.length === 0) {
            if (image_path) {
                try {
                    await fs.unlink(path.join('uploads', image_path));
                } catch (unlinkError) {
                    console.error("Error deleting unused image:", unlinkError);
                }
            }
            return res.status(404).json({
                success: false,
                message: "Carousel item not found"
            });
        }

        // Build update query dynamically based on provided fields
        const updates = [];
        const values = [];
        let paramCount = 1;

        if (title) {
            updates.push(`title = $${paramCount}`);
            values.push(title);
            paramCount++;
        }

        if (image_path) {
            updates.push(`image_path = $${paramCount}`);
            values.push(image_path);
            paramCount++;
        }

        if (img_description) {
            updates.push(`img_description = $${paramCount}`);
            values.push(img_description);
            paramCount++;
        }

        if (link) {
            updates.push(`link = $${paramCount}`);
            values.push(link);
            paramCount++;
        }

        if (status) {
            updates.push(`status = $${paramCount}`);
            values.push(status);
            paramCount++;
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);

        values.push(id);
        const result = await db.query(
            `UPDATE carousel 
             SET ${updates.join(', ')} 
             WHERE id = $${paramCount} 
             RETURNING id, title, image_path, img_description, link, status, updated_at`,
            values
        );

        // If update successful and new image uploaded, delete old image
        if (result.rows.length > 0 && image_path && existing.rows[0].image_path) {
            try {
                await fs.unlink(path.join('uploads', existing.rows[0].image_path));
            } catch (unlinkError) {
                console.error("Error deleting old image:", unlinkError);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Carousel item updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in updateCarousel:", error);
        
        // If there's an error and a new image was uploaded, delete it
        if (req.files?.image) {
            try {
                await fs.unlink(path.join('uploads', req.files.image[0].filename));
            } catch (unlinkError) {
                console.error("Error deleting image after failed update:", unlinkError);
            }
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update carousel item",
            error: error.message
        });
    }
};


export const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Carousel ID is required"
            });
        }

        // First, get the image path before deleting the record
        const imageResult = await db.query(
            'SELECT image_path FROM carousel WHERE id = $1',
            [id]
        );

        if (imageResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Carousel item not found"
            });
        }

        // Delete the record from the database
        const result = await db.query(
            `DELETE FROM carousel WHERE id = $1 RETURNING *`,
            [id]
        );

        // Delete the associated image file
        const imagePath = imageResult.rows[0].image_path;
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
            message: "Carousel item deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error in deleteCarousel:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete carousel item",
            error: error.message
        });
    }
};