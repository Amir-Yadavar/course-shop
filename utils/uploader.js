const path = require("path")
const multer = require("multer")

module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "courses", "covers"))
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + `${Math.random() * 2222}`
        const ext = path.extname(file.originalname)
        cb(null, fileName + ext)
    }
})