const express = require("express")
const notificationController = require("./../controllers/notificationController")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()


router.route("/")

    .post(hasToken, isAdmin, notificationController.create)
    .get(hasToken, isAdmin, notificationController.getAll)
router.route("/:id")
    .get(hasToken, notificationController.getOne)
    .delete(hasToken, isAdmin, notificationController.remove)
module.exports = router