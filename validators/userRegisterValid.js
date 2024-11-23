const validator = require("fastest-validator")

const v = new validator()

const schema = {
    firstName: { type: "string", min: 3, max: 100 },
    lastName: { type: "string", min: 3, max: 100 },
    email: { type: "email", min: 10, max: 100 },
    password: { type: "string", min: 8, max: 24 },
    confirmPassword: { type: "equal", field: "password" },
    phone: { type: "string", min: 11, max: 11 },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check