const express = require("express")
const hasToken = require("../middlewares/auth")
const isAdmin = require("../middlewares/isAdmin")
const courseController = require("./../controllers/courseController")
const multer = require("multer")
const uploader = require("./../utils/uploader")

const router = express.Router()

router.route("/:href")
    .get(courseController.getOneCourse)
router.route("/:id?")

    .get(hasToken, courseController.getAll)
    .delete(hasToken, isAdmin, courseController.removeOne)
    .post(hasToken, isAdmin, multer({ storage: uploader }).single("cover"), courseController.create)
    .put(hasToken, isAdmin, multer({ storage: uploader }).single("cover"), courseController.editCourse)


router.route("/:id/session")
    .post(hasToken, isAdmin, courseController.addSession)


router.route("/:id/register")
    .post(hasToken, courseController.courseUserRegister)

router.route("/category/:href")
    .get(courseController.getCourseByCategory)

router.route("/sessions")
    .get(hasToken, isAdmin, courseController.getAllSessions)

router.route("/session/:id")
    .delete(hasToken, isAdmin, courseController.removeSession)
module.exports = router