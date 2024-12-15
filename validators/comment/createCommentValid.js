const validator = require("fastest-validator")

const v = new validator()

const schema = {
    body: { type: "string", min: 3 },
    course: { type: "string", min: 2 },
    score: { type: "number" },
    isAnswer: { type: "boolean" },
    $$strict: true
}

const check = v.compile(schema)

module.exports = check