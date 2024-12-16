const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const courseController = require("./../controllers/courseController")
const multer = require("multer")
const uploader = require("./../utils/uploader")

const router = express.Router()

router.route("/:id?")
    .post(hasToken, isAdmin, multer({ storage: uploader }).single("cover"), courseController.create)
    .get(hasToken, courseController.getAll)
    .put(hasToken, isAdmin, multer({ storage: uploader }).single("cover"), courseController.editCourse)

router.route("/:id/session")
    .post(hasToken, isAdmin, courseController.addSession)


router.route("/:id/register")
    .post(hasToken, courseController.courseUserRegister)
router.route("/sessions")
    .get(hasToken, isAdmin, courseController.getAllSessions)

router.route("/session/:id")
    .delete(hasToken, isAdmin, courseController.removeSession)
module.exports = router