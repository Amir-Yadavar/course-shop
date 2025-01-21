const express = require("express")
const subDepartmentController = require("./../controllers/subDepartmentController")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router()

router.route("/")
    .get(subDepartmentController.getAll)
    .post(hasToken, isAdmin, subDepartmentController.create)

router.route("/:id")
    .delete(hasToken, isAdmin, subDepartmentController.remove)
    .put(hasToken, isAdmin, subDepartmentController.edit)

module.exports = router