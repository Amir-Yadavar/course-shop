const userModel = require("./../models/User")
const jwt = require("jsonwebtoken")

const hasToken = async (req, res, next) => {
    // get header for check has token
    const authHeader = req.header("Authorization")?.split(" ")

    if (authHeader?.length !== 2) {
        res.status(403).json({ message: "unAuthorization .." })
    }

    // get token
    const token = authHeader && authHeader[1]
    try {
        // get payload from token
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET)

        // find user by payload
        const user = await userModel.findOne({ phone: jwtPayload.phone })
        const userObj = user.toObject()
        Reflect.deleteProperty(userObj, "password")

        // set user in req and access in next middleware
        req.user = userObj
        next()

    } catch (error) {
        console.log(error);
        return res.status(409).json(error)
    }
}

module.exports = hasToken