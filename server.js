const app = require("./app")
const mongoose = require("mongoose")
require("dotenv").config()

const port = process.env.PORT
// console.log(process.env.MONGO_URL);
const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongoDB connected ..");
}

connectToDB()

app.listen(port, () => {
    console.log(`server running in port ${port}`);
})