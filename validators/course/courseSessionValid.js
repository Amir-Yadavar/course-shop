const validator = require("fastest-validator")

const v = new validator()

const schema = {
    title: { type: "string", min: 3 },
    isFree: { type: "number", min: 0, max: 1 },
    time: { type: "string", min: 1 }
}

const check = v.compile(schema)

module.exports = check