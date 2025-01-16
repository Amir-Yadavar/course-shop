const mongoose = require("mongoose")

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    usage: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const model = mongoose.model("Off", schema)

module.exports = { model }