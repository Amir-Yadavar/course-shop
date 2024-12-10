const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const courseController = require("./../controllers/courseController")
const multer = require("multer")
const uploader = require("./../utils/uploader")

const router = express.Router()

router.route("/")
    .post(hasToken, isAdmin, multer({ storage: uploader }).single("cover"), courseController.create)
    .get(hasToken, courseController.getAll)

router.route("/:id/session")
    .post(hasToken, isAdmin, courseController.addSession)

router.route("/sessions")
    .get(hasToken, isAdmin, courseController.getAllSessions)
module.exports = router