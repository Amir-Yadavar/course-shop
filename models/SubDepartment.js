const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    }
}, { timestamps: true })

const model = mongoose.model("SubDepartment", schema)

module.exports = { model }