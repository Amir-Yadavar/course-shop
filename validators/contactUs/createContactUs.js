const validator = require("fastest-validator")

const v = new validator()

const schema = {
    name: { type: "string", min: 4 },
    email: { type: "email", min: 10, max: 100 },
    phone: { type: "string", min: 11, max: 11 },
    body: { type: "string", min: 10 },
}

const check = v.compile(schema)

module.exports = check