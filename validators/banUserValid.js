const validator = require("fastest-validator")

const v = new validator()

const schema = {
    phone: { type: "string", min: 11, max: 11 },
    firstName: { type: "string", min: 3, max: 100 },
    lastName: { type: "string", min: 3, max: 100 },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check