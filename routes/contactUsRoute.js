const express = require("express")
const hasToken = require("./../middlewares/auth")
const isAdmin = require("./../middlewares/isAdmin")
const contactUsController = require("./../controllers/contactUsController")

const router = express.Router()

router.route("/:id?")
    .post(contactUsController.create)
    .get(hasToken, isAdmin, contactUsController.getAll)
    .delete(hasToken, isAdmin, contactUsController.remove)

module.exports = router