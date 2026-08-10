import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({
                message: 'token not provided'
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({
            message:'invalid or expired token'
        })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // 👇 Check karein ki req.user ya req.user.role exist karta hai ya nahi
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied: Unauthorized role"
            });
        }
        next();
    };
};