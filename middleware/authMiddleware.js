const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Token is missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user to request
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
