const express = require("express")
const hasToken = require("../middlewares/auth")
const commentController = require("./../controllers/commentController")
const isAdmin = require("./../middlewares/isAdmin")

const router = express.Router()

router.route("/:id/accept")
    .put(hasToken, isAdmin, commentController.acceptComment)
router.route("/:id/reject")
    .put(hasToken, isAdmin, commentController.rejectComment)
router.route("/:id/answer")
    .post(hasToken, isAdmin, commentController.answer)
router.route("/:id?")
    .delete(hasToken, isAdmin, commentController.remove)
    .post(hasToken, commentController.create)

module.exports = router