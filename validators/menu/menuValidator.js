const validator = require("fastest-validator")

const v = new validator()

const schema = {
    title: { type: "string", min:2},
    href: { type: "string", min:2},
    parentMenu: { type: "string",optional: true},
}

const result = v.compile(schema)

module.exports = result