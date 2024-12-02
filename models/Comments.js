const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true
    },
    score: {
        type: Number,
        default: 5
    },
    isAnswer: {
        type: Boolean,
        required: true
    },
    mainCommentID: {
        type: mongoose.Types.ObjectId,
        ref: "Comments"
    },
    isAccept: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const model = new mongoose.model("Comments", schema)

module.exports = { model }