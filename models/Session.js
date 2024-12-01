const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    isFree: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }

}, { timestamps: true })

const model = new mongoose.model("Session", schema)

module.exports = { model }