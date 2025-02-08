import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();


export const getApprovedProjects = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.project_id,
                p.user_id,
                p.title,
                p.description,
                p.open_until,
                p.status,
                p.pushed_to_website,
                p.created_at,
                p.technology,
                p.image_path,
                p.openings,
                p.pdf_path,
                u.first_name,
                u.last_name
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE (p.status = 'approved' or p.status='completed') and  u.user_type='student'
            ORDER BY p.created_at DESC
        `;

        const result = await db.query(query);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No approved projects found'
            });
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows,
            
        });

    } catch (error) {
        console.error('Error in getApprovedProjects:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getPendingProjects = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.project_id,
                p.user_id,
                p.title,
                p.description,
                p.open_until,
                p.status,
                p.pushed_to_website,
                p.created_at,
                p.technology,
                p.image_path,
                p.openings,
                p.pdf_path,
                u.first_name,
                u.last_name
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE p.status = 'pending' and  u.user_type='student'
            ORDER BY p.created_at ASC
        `;

        const result = await db.query(query);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No pending projects found'
            });
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows,
            
        });

    } catch (error) {
        console.error('Error in getPendingProjects:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


export const getDeniedProjects = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.project_id,
                p.user_id,
                p.title,
                p.description,
                p.open_until,
                p.status,
                p.pushed_to_website,
                p.created_at,
                p.technology,
                p.image_path,
                p.openings,
                p.pdf_path,
                u.first_name,
                u.last_name
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE p.status = 'denied' and u.user_type='student'
            ORDER BY p.created_at DESC
        `;

        const result = await db.query(query);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No denied projects found'
            });
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows,
            
        });

    } catch (error) {
        console.error('Error in getDeniedProjects:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const searchProjects = async (req, res) => {
    try {
        const {
            title,
            first_name,
            last_name,
            description,
            technology,
            created_at,
            status
        } = req.body;

        let query = `
            SELECT 
                p.project_id,
                p.user_id,
                p.title,
                p.description,
                p.open_until,
                p.status,
                p.pushed_to_website,
                p.created_at,
                p.technology,
                p.image_path,
                p.openings,
                p.pdf_path,
                u.first_name,
                u.last_name
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE 1=1 
        `;

        const values = [];
        let valueIndex = 1;
        query += `and u.user_type = 'student'`
        if (title) {
            query += ` AND LOWER(p.title) LIKE LOWER($${valueIndex})`;
            values.push(`%${title}%`);
            valueIndex++;
        }

        if (first_name) {
            query += ` AND LOWER(u.first_name) LIKE LOWER($${valueIndex})`;
            values.push(`%${first_name}%`);
            valueIndex++;
        }

        if (last_name) {
            query += ` AND LOWER(u.last_name) LIKE LOWER($${valueIndex})`;
            values.push(`%${last_name}%`);
            valueIndex++;
        }

        if (description) {
            query += ` AND LOWER(p.description) LIKE LOWER($${valueIndex})`;
            values.push(`%${description}%`);
            valueIndex++;
        }

        if (technology) {
            const techArray = Array.isArray(technology) 
                ? technology.filter(tech => tech)
                : technology.split(',').map(tech => tech.trim()).filter(tech => tech);

            if (techArray.length > 0) {
                query += ` AND EXISTS (
                    SELECT 1 
                    FROM unnest(p.technology) tech 
                    WHERE LOWER(tech) = ANY(ARRAY[${techArray.map((_, i) => `LOWER($${valueIndex + i})`).join(', ')}])
                )`;
                values.push(...techArray);
                valueIndex += techArray.length;
            }
        }

        if (created_at) {
            query += ` AND DATE(p.created_at) = $${valueIndex}`;
            values.push(created_at);
            valueIndex++;
        }

        if (status) {
            query += ` AND LOWER(p.status) = LOWER($${valueIndex})`;
            values.push(status);
            valueIndex++;
        }

        query += ` ORDER BY p.created_at DESC`;

        const result = await db.query(query, values);

        if (!result.rows || result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No projects found matching the criteria'
            });
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows,
            
        });

    } catch (error) {
        console.error('Error in searchProjects:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
export const changeStatus = async (req, res) => {
    try {
        // Input validation
        const { project_id, status } = req.body;
        
        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: 'Project ID is required'
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        // Validate status values (add your valid statuses)
        const validStatuses = ['pending', 'approved', 'denied'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        // Update project status
        const result = await db.query(
            'UPDATE projects SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE project_id = $2 RETURNING *',
            [status.toLowerCase(), project_id]
        );

        // Check if project exists
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Project status updated successfully',
            data: result.rows[0]
        });

    } catch (error) {
        // Log the error for debugging (use your preferred logging solution)
        console.error('Error updating project status:', error);

        // Return error response
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating project status',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
