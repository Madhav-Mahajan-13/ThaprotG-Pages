import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const getImages = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.body;
        const offset = (page - 1) *limit;

        const countQuery =`select count(*) from gallery `;

        const totalCount = await db.query(countQuery);
        const totalProjects = parseInt(totalCount.rows[0].count);
        const totalPages = Math.ceil(totalProjects / limit);

        const query = `
           SELECT id, tag, description, imgsrc 
            FROM gallery 
            order by created_at desc
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
        console.error("Error fetching images:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};