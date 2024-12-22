const express = require("express")
const hasToken = require("../middlewares/auth")
const commentController = require("./../controllers/commentController")
const isAdmin = require("./../middlewares/isAdmin")

const router = express.Router()

router.route("/:id?")
    .post(hasToken, commentController.create)
    .delete(hasToken, isAdmin, commentController.remove)

router.route("/:id/accept")
    .put(hasToken, isAdmin, commentController.acceptComment)
router.route("/:id/reject")
    .put(hasToken, isAdmin, commentController.rejectComment)
module.exports = router