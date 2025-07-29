const jwt = require('jsonwebtoken')

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(404).json({ message: "No Token Found" })
        }

        const decoded = jwt.verify(token, "Access")
        if (decoded) {
            req.user = decoded.userId
            next()
        }
    } catch (error) {
        return res.status(401).json({ message: "Access token invalid or expired" });
    }
}

module.exports = AuthMiddleware