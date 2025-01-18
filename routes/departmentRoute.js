const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const departmentController = require("./../controllers/departmentController")

const router = express.Router()

router.route("/")
    .get(departmentController.getAll)
    .post(hasToken, isAdmin, departmentController.create)

router.route("/:id")
    .delete(hasToken, isAdmin, departmentController.remove)
    .put(hasToken, isAdmin, departmentController.edit)

module.exports = router