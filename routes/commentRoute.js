const express = require("express")
const hasToken = require("../middlewares/auth")
const commentController = require("./../controllers/commentController")

const router = express.Router()

router.route("/")
    .post(hasToken, commentController.create)

module.exports = router