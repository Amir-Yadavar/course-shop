const validator = require("fastest-validator")

const v = new validator()

const schema = {
    title: { type: "string", min: 3 },
    description: { type: "string", min: 3 },
    support: { type: "string", min: 3 },
    href: { type: "string", min: 3 },
    price: { type: "string",},
    discount: { type: "string" },
    score: { type: "string", min: 1 },
    lastUpdate: { type: "string", min: 3 },
    categoryID: { type: "string", min: 3 },
    teacher: { type: "string", min: 3 },
    statusProgress: { type: "string", min: 3 },
}

const check = v.compile(schema)

module.exports = check