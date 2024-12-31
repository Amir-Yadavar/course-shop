const express = require("express")
const hasToken = require("./../middlewares/auth")
const isAdmin = require("./../middlewares/isAdmin")
const contactUsController = require("./../controllers/contactUsController")

const router = express.Router()

router.route("/")
    .get(hasToken, isAdmin, contactUsController.getAll)

    module.exports = router