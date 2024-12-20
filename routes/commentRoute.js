const express = require("express")
const hasToken = require("../middlewares/auth")
const commentController = require("./../controllers/commentController")
const isAdmin = require("./../middlewares/isAdmin")

const router = express.Router()

router.route("/:id?")
    .post(hasToken, commentController.create)
    .delete(hasToken, isAdmin, commentController.remove)

module.exports = router