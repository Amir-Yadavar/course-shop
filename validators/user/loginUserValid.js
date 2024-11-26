const validator = require("fastest-validator")

const v = new validator()

const schema = {
    identifier: { type: "string", min: 11 },
    password: { type: "string", min: 8 }
}

const check = v.compile(schema)

module.exports = check