const express = require("express")
const hasToken = require("../middlewares/auth")
const multer = require("multer")
const uploaderTicket = require("./../utils/uploaderTicket")
const ticketController = require("./../controllers/ticketController")

const router = express.Router()

router.route("/")
    .post(hasToken, multer({ storage: uploaderTicket }).single("image"), ticketController)


module.exports = router