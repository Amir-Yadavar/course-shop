const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const offController = require("./../controllers/offController")

const router = express.Router()

router.route("/")
    .get(hasToken, isAdmin, offController.getAll)
    .post(hasToken, isAdmin, offController.create)

router.route("/campaign").post(hasToken, isAdmin, offController.campaign)

router.route("/:code")
.post(hasToken,offController.getOne)
router.route("/:id")
    .delete(hasToken, isAdmin, offController.remove)

module.exports = router