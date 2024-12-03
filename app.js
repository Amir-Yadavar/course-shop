const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoute = require("./routes/userRoute")
const categoryRoute = require("./routes/categoryRoute")
const teacherRoute = require("./routes/teacherRoute")

const app = express()

// app middleware for get body from ui
app.use(express.json())

// app middleware for get data from ui
// app.use(express.urlencoded())

// app middleware for handle cors policy
app.use(cors())

// app middleware for set static path covers
app.use("/courses/covers", express.static(path.join(__dirname, "public", "courses", "covers")))



// user route
app.use("/api/auth/user", userRoute)
// category route
app.use("/api/category", categoryRoute)
// teacher route
app.use("/api/teacher", teacherRoute)

module.exports = app 