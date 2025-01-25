import jwt from 'jsonwebtoken';

export async function getUser(req, res, next) {
    try {
        const verify = req.header('verify'); // Header to check if verification is needed
        const token = req.header('authToken'); // Authorization token

        if (!token) {
            return res.status(400).json({ msg: "Token is required", success: false });
        }

        // Verifying the token using the secret key
        const data = jwt.verify(token, process.env.sec_key);

        if (!data) {
            return res.status(401).json({ msg: "Invalid Token", success: false });
        }

        if (verify) {
            return res.status(200).json({ msg: "Token is valid", success: true });
        }

        // Adding user data to the request object for further use
        req.uid = data.id;
        req.email = data.email;
        req.body.email = data.email;

        next(); // Proceed to the next middleware
    } catch (e) {
        // Handling errors during token verification
        return res.status(500).json({ msg: e.message, success: false });
    }
}
