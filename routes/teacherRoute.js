const express = require("express")
const hasToken = require("../middlewares/auth")
const teacherController = require("./../controllers/teacherController")
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router()


router.route("/:id?")
    .get(hasToken, teacherController.getAll)
    .post(hasToken, isAdmin, teacherController.create)
    .put(hasToken, isAdmin, teacherController.update)
    .delete(hasToken, isAdmin, teacherController.remove)

module.exports = router