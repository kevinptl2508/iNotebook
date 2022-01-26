const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Kevinisagoodboy';

const fetchUser = (req, res, next) => {
    // Get user from JWT Token & add id to req object
    const token = req.header('authToken');
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid auth token." });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid auth token." });
    }
}
module.exports = fetchUser;