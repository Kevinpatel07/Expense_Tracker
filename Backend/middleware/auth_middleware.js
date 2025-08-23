const jwt = require('jsonwebtoken')

const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer ')){
           return  res.status(404).json({message:"No Token Found"})
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        if (decoded) {
            req.user = decoded.userId
            next()
        }
    } catch (error) {
        return res.status(401).json({ message: "Access token invalid or expired" });
    }
}

module.exports = AuthMiddleware