const express = require("express")
const hasToken = require("../middlewares/auth")
const multer = require("multer")
const uploaderTicket = require("./../utils/uploaderTicket")
const ticketController = require("./../controllers/ticketController")
const isAdmin = require("../middlewares/isAdmin")

const router = express.Router()

router.route("/")
    .post(hasToken, multer({ storage: uploaderTicket }).single("image"), ticketController.create)
    .get(hasToken, isAdmin, ticketController.getAll)

module.exports = router