const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const categoryController = require('./../controllers/categoryController')

const router = express.Router()

router.route("/")
    .post(hasToken, isAdmin, categoryController.createCategory)
    .get(categoryController.getAllCategory)

router.route("/:id")
    .delete(hasToken, isAdmin, categoryController.deleteCategory)
    .put(hasToken, isAdmin, categoryController.updateCategory)


module.exports = router