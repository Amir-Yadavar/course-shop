const multer = require("multer")
const path = require("path")

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "ticket"))
    },
    filename: (req, file, cb) => {
        const name = Date.now() + `${Math.random() * 2222}`
        const ext = path.extname(file.originalname)
        cb(null, name + ext)
    }
})