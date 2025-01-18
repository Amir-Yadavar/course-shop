const mongoose = require("mongoose")

const schema = mongoose.Schema({}, { timestamps: true })

const model = mongoose.model("", schema)

module.exports = { model }