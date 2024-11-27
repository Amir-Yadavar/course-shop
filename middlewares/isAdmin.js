const isAdmin = async (req, res, next) => {
    const isAdminCheck = req.user.role === "ADMIN"

    if (isAdminCheck) {
        return next()
    }

    return res.status(403).json({ message: "this route only access by role admins .." })
}
module.exports = isAdmin