const express = require("express")
const notificationController = require("./../controllers/notificationController")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()


router.route("/")
    .post(hasToken , isAdmin,notificationController.create)

module.exports = router