import db from "../dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
    try {
        
        const { user_id, password } = req.body;
        
        if (!user_id || !password) {
            return res.status(400).json({
                success: false,
                message: 'User ID and password are required'
            });
        }

        const query = `
            SELECT 
                user_id,
                type,
                name,
                status
            FROM admin 
            WHERE user_id = $1 
            AND password = $2
        `;

        const result = await db.query(query, [user_id, password]);

        // 3. Check if admin exists and get first row
        if (!result.rows || result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const admin = result.rows[0];

        // 4. Check account status
        if (admin.status !== 'active') {
            return res.status(403).json({
                success: false,
                message: 'Your account is suspended. Please contact the administrator for further details.',
                status: admin.status
            });
        }

        // 5. Success - admin is verified and active
        const adminResponse = {
            user_id: admin.user_id,
            name: admin.name,
            type: admin.type,
            status: admin.status
        };

        // You might want to add session/token logic here
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            admin: adminResponse
        });

    } catch (error) {
        // Log error for debugging
        console.error('Login error:', error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred during login. Please try again later.'
        });
    }
};