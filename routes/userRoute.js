const express = require("express")
const userController = require("./../controllers/userController")
const hasToken = require("./../middlewares/auth")
const isAdmin = require("./../middlewares/isAdmin")

const userRouter = express.Router()
userRouter.route("/:id?")
.get(hasToken, isAdmin,userController.getAll)
.delete(hasToken, isAdmin,userController.deleteUser)
.put(hasToken,userController.editUser)
userRouter.route("/banUser/:id").put(hasToken, isAdmin, userController.banUser)
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
// userRouter.post("/getMe", userController.getMe)

module.exports = userRouter