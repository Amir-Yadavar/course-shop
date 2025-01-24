const mongoose = require("mongoose")

const schema = mongoose.Schema({
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    },
    subDepartment: {
        type: mongoose.Types.ObjectId,
        ref: "SubDepartment",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    mainTicket: {
        type: mongoose.Types.ObjectId,
        ref: "Ticket"
    },
    isAnswer: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const model = mongoose.model("Ticket", schema)

module.exports = { model }