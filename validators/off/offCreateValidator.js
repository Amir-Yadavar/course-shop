const validator = require("fastest-validator")

const v = new validator()

const schema = {
    code: { type: "string", min: 3 },
    percent: { type: "number", min: 1 },
    creator: { type: "string", min: 1 },
    max: { type: "number", min: 1 },
}

const check = v.compile(schema)

module.exports = check