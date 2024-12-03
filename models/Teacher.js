const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    skills:{
        type:Array,
        required:true
    },
    // course:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"Course"
    // },
    profileImg:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    social:{
        type:Array,
        default:[]
    }
}, { timestamps: true })

const model = new mongoose.model("Teacher", schema)

module.exports = { model }