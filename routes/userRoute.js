const express = require("express")
const  userController  = require("./../controllers/userController")

const userRouter = express.Router()

userRouter.post("/register", userController.register)
userRouter.post("/banUser/:id",userController.banUser)
// userRouter.post("/login", userController.login)
// userRouter.post("/getMe", userController.getMe)

module.exports = userRouter