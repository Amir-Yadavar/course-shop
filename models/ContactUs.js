const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hasAnswer: {
        type: Boolean,
        default: false
    },
    body: {
        type: String,
        required: true
    },
}, { timestamps: true })

const model = mongoose.model("ContactUs", schema)

module.exports = { model }