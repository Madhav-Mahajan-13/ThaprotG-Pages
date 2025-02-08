import jwt from 'jsonwebtoken';

export async function getUser(req, res, next) {
    try {

        const verify = req.header('verify'); // Check if token verification is required
        const token = req.cookies.authToken; // Read token from cookies
        if (!token) {
            return res.status(401).json({ msg: "Authentication required", success: false });
        }
        
        // Verify the token using the secret key
        const data = jwt.verify(token, process.env.sec_key);
        if (!data) {
            return res.status(403).json({ msg: "Invalid Token", success: false });
        }

        if (verify) {
            return res.status(200).json({ msg: "Token is valid", success: true });
        }

        // Attach user data to request
        req.uid = data.id;
        req.email = data.email;
        req.body.email = data.email;
        
        next(); // Proceed to the next middleware

    } catch (e) {
        return res.status(500).json({ msg: e.message, success: false });
    }
}
