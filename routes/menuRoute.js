const express = require("express")
const menuController = require("./../controllers/menuController")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router()

router.route("/")
    .get(menuController.getAll)
    .post(hasToken, isAdmin, menuController.create)

router.route("/:id")
    .put(hasToken, isAdmin, menuController.edit)
    .delete(hasToken, isAdmin, menuController.remove)


module.exports = router