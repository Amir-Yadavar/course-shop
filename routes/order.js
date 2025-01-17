const express = require("express")
const hasToken = require("./../middlewares/auth")
const orderController = require("./../controllers/orderController")
const router = express.Router()


router.route("/")
    .get(hasToken, orderController.getAll)


router.route("/:id")
    .get(hasToken, orderController.getOne)
    
module.exports = router