const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const newsletterController = require("./../controllers/newsletterController")

const router = express.Router()


router.route("/:id?")
    .post(newsletterController.create)
    .get(hasToken, isAdmin, newsletterController.getAll)
    .delete(hasToken, isAdmin, newsletterController.remove)


module.exports = router