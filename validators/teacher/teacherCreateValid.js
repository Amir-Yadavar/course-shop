const validator = require("fastest-validator")

const v =new validator()

const schema = {}

const check = v.compile(schema)

module.exports = check