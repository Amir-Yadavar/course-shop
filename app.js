const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoute = require("./routes/userRoute")
const categoryRoute = require("./routes/categoryRoute")
const teacherRoute = require("./routes/teacherRoute")
const courseRoute = require("./routes/courseRoute")
const commentRoute = require("./routes/commentRoute")
const contactUsRoute = require("./routes/contactUsRoute")
const newsletterRoute = require("./routes/newsletterRoute")
const searchRoute = require("./routes/searchRoute")
const notificationRoute = require("./routes/notificationRoute")
const offRoute = require("./routes/offRoute")
const orderRoute = require("./routes/order")
const departmentRoute = require("./routes/departmentRoute")
const subDepartmentRoute = require("./routes/subDepartmentRoute")

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
// course route
app.use("/api/course", courseRoute)
// comment route
app.use("/api/comment", commentRoute)
// contactUs route
app.use("/api/contactUs", contactUsRoute)
// newsletter route
app.use("/api/newsletter", newsletterRoute)
// search route
app.use("/api/search", searchRoute)
// notification route
app.use("/api/notification", notificationRoute)
// off route
app.use("/api/off", offRoute)
// order route
app.use("/api/order", orderRoute)
// department route
app.use("/api/department", departmentRoute)
// sub department route
app.use("/api/subDepartment", subDepartmentRoute)

module.exports = app 