const validator = require("fastest-validator")

const v = new validator()

const schema = {
    name: { type: "string", min: 3 },
    skills: { type: "array", min: 1 },
    profileImg: { type: "string" },
    description: { type: "string", min: 1 },
    social: { type: "array" },

}

const check = v.compile(schema)

module.exports = check