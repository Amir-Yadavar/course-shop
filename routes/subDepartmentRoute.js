const express = require("express")
const subDepartmentController = require("./../controllers/subDepartmentController")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router()

router.route("/")
    .get(subDepartmentController.getAll)
    .post(hasToken, isAdmin, subDepartmentController.create)



module.exports = router