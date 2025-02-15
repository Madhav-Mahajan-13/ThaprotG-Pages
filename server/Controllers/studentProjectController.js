import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const getStudentProjects = async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.body;

        const offset = (page - 1) * limit;

        // Count total projects
        const countQuery = `
            SELECT COUNT(*) FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE u.user_type = 'student' AND p.status = 'approved'
        `;
        const totalCount = await db.query(countQuery);
        const totalProjects = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalProjects / limit);

        // Fetch projects with pagination
        const query = `
            SELECT 
                p.project_id, p.title, p.description, p.technology, 
                p.openings, p.status, p.created_at,
                u.first_name, u.last_name,p.image_path,p.pdf_path,p.open_until,u.username
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            WHERE u.user_type = 'student' and p.status='approved'
            ORDER BY p.created_at DESC
            LIMIT $1 OFFSET $2
        `;

        const result = await db.query(query, [limit, offset]);

        return res.status(200).json({
            success: true,
            message: result.rows.length ? 'Projects retrieved successfully' : 'No projects found',
            data: {
                projects: result.rows,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalProjects,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while fetching projects' });
    }
};


export const searchProjects = async (req, res) => {
    try {
        // Destructure and sanitize input parameters
        const {
            title = '',
            description = '',
            technology = [],
            openings,
            page = 1,
            limit = 12
        } = req.body;

        // Validate pagination parameters
        const validatedPage = Math.max(1, parseInt(page) || 1);
        const validatedLimit = Math.min(50, Math.max(1, parseInt(limit) || 10));
        const offset = (validatedPage - 1) * validatedLimit;

        // Initialize query building arrays
        const conditions = ["u.user_type = 'student'"];
        const params = [];
        let paramCount = 1;

        // Build search conditions
        const searchConditions = {
            title: title?.trim(),
            description: description?.trim(),
            technology: Array.isArray(technology) ? technology.filter(t => t?.trim()) : [],
            openings: !isNaN(parseInt(openings)) ? parseInt(openings) : null
        };

        // Add title condition if provided
        if (searchConditions.title) {
            conditions.push(`LOWER(p.title) LIKE LOWER($${paramCount})`);
            params.push(`%${searchConditions.title}%`);
            paramCount++;
        }

        // Add description condition if provided
        if (searchConditions.description) {
            conditions.push(`LOWER(p.description) LIKE LOWER($${paramCount})`);
            params.push(`%${searchConditions.description}%`);
            paramCount++;
        }

        // Add technology condition if provided with case-insensitive matching
        let techParamIndex = null;
        if (searchConditions.technology.length > 0) {
            techParamIndex = paramCount;
            conditions.push(`
                EXISTS (
                    SELECT 1 FROM unnest(p.technology) tech 
                    WHERE LOWER(tech) = ANY(
                        SELECT LOWER(t) FROM unnest($${paramCount}::text[]) t
                    )
                )
            `);
            params.push(searchConditions.technology);
            paramCount++;
        }

        // Add openings condition if provided
        if (searchConditions.openings !== null) {
            conditions.push(`p.openings = $${paramCount}`);
            params.push(searchConditions.openings);
            paramCount++;
        }

        // Construct WHERE clause
        const whereClause = conditions.length ? `WHERE p.status='approved' AND ${conditions.join(' AND ')}` : "WHERE p.status='approved'";



        // Get total count
        const countQuery = `
            SELECT COUNT(*) 
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            ${whereClause}
        `;
        
        const totalCount = await db.query(countQuery, params);
        const totalProjects = parseInt(totalCount.rows[0]?.count || 0);
        const totalPages = Math.ceil(totalProjects / validatedLimit);

        // Return early if no results
        if (totalProjects === 0) {
            return res.status(200).json({
                success: true,
                message: 'No matching projects found',
                data: {
                    projects: [],
                    pagination: {
                        currentPage: validatedPage,
                        totalPages,
                        totalProjects,
                        hasNextPage: false,
                        hasPreviousPage: validatedPage > 1
                    }
                }
            });
        }

        // Construct ORDER BY clause
        let orderByClause = `ORDER BY p.created_at DESC`;
        if (techParamIndex !== null) {
            orderByClause = `
                ORDER BY 
                    (
                        SELECT COUNT(*) FROM unnest(p.technology) tech 
                        WHERE LOWER(tech) = ANY(
                            SELECT LOWER(t) FROM unnest($${techParamIndex}::text[]) t
                        )
                    ) DESC,
                    p.created_at DESC
            `;
        }

        // Get paginated results
        const searchQuery = `
            SELECT 
                p.project_id, p.title, p.description, p.technology, 
                p.openings, p.created_at, p.status, u.first_name, u.last_name, 
                p.image_path, p.pdf_path, p.open_until
            FROM projects p
            JOIN users u ON p.user_id = u.id2
            ${whereClause}
            ${orderByClause}
            LIMIT $${paramCount} OFFSET $${paramCount + 1}
        `;

        params.push(validatedLimit, offset);
        const result = await db.query(searchQuery, params);

        return res.status(200).json({
            success: true,
            message: 'Projects retrieved successfully',
            data: {
                projects: result.rows,
                pagination: {
                    currentPage: validatedPage,
                    totalPages,
                    totalProjects,
                    hasNextPage: validatedPage < totalPages,
                    hasPreviousPage: validatedPage > 1
                }
            }
        });

    } catch (error) {
        console.error('Error searching projects:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while searching projects',
            error: error.message       });
    }
};