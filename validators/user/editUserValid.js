const validator = require("fastest-validator")

const v = new validator()

const schema = {
    firstName: { type: "string", min: "3" },
    lastName: { type: "string", min: "3" },
    email: { type: "email", min: "10" },
    phone: { type: "string", min: "11", max: "11" },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check