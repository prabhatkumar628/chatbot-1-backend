import jwt from "jsonwebtoken"

const verfiyUser = async (req, res, next) => {
    
    try {
        const token = req.cookies?.chatBotToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res
                .status(400)
                .json({ succes: false, data: null, message: "Unauthorized Request" })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        if (!decoded) {
            return res
                .status(400)
                .json({ succes: false, data: null, message: "Session expired, Please login again" })
        }
        next()
    } catch (error) {
        console.log(error.message)
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ success: false, message: "Session expired, Please login again" });
        }
        return res
            .status(400)
            .json({ success: false, message: "Invalid token, Please login again" });
    }
}

export default verfiyUser