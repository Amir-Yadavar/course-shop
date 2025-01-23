const validator = require("fastest-validator")

const v =new validator()

const schema = {
    department:{type:"string",min:15},
    subDepartment:{type:"string",min:15},
    title:{type:"string",min:4},
    body:{type:"string",min:10},
}


const check = v.compile(schema)

module.exports = check
