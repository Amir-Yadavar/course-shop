const express = require("express")
const userController = require("./../controllers/userController")
const hasToken = require("./../middlewares/auth")
const isAdmin = require("./../middlewares/isAdmin")

const userRouter = express.Router()
userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.put("/role", hasToken, isAdmin, userController.changeRole)
userRouter.route("/:id?")
    .put(hasToken, userController.editUser)
    .get(hasToken, isAdmin, userController.getAll)
    .delete(hasToken, isAdmin, userController.deleteUser)
userRouter.route("/banUser/:id").put(hasToken, isAdmin, userController.banUser)
// userRouter.post("/getMe", userController.getMe)

module.exports = userRouter