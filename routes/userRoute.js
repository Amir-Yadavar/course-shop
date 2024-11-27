const express = require("express")
const userController = require("./../controllers/userController")
const hasToken = require("./../middlewares/auth")
const isAdmin = require("./../middlewares/isAdmin")

const userRouter = express.Router()

userRouter.post("/register", userController.register)
userRouter.route("/banUser/:id").post(hasToken, isAdmin, userController.banUser)
userRouter.post("/login", userController.login)
// userRouter.post("/getMe", userController.getMe)

module.exports = userRouter