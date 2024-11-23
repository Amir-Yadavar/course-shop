const app = require("./app")
const mongoose = require("mongoose")
require("dotenv").config()

const port = process.env.PORT
console.log(process.env.MONGO_URL);
    (async () => {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongoDB connected ..");
    })()

app.listen(port, () => {
    console.log(`server running in port ${port}`);
})