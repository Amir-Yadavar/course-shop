const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    isBan: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const model = new mongoose.model("User", Schema)

module.exports = model 