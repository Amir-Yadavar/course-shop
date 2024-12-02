const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    support: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        default: 5
    },
    lastUpdate: {
        type: String,
        required: true
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
        required: true
    },

    statusProgress: {
        type: String,
        required: true
    },

}, { timestamps: true })

schema.virtual("sessions", {
    ref: "Session",
    localField: "_id",
    foreignField: "course"
})
schema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "course"
})

const model = new mongoose.model("Course", schema)

module.exports = { model }