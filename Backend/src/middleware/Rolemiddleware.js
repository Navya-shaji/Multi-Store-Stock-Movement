import jwt from "jsonwebtoken";


export const RoleMiddleware = (req, res, next) => {

    try {
        const header = req.headers.authorization
        if (!header || !header.includes("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const token = header.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }


}
