const { isValidObjectId } = require("mongoose")
const { model: teacherModel } = require("./../models/Teacher")
const validator = require("./../validators/teacher/teacherCreateValid")

const getAll = async (req, res) => {

    const allTeacher = await teacherModel.find({}, "-__v -createdAt -updatedAt")
    return res.json(allTeacher)

}

const create = async (req, res) => {
    // is valid data by fastest
    const result = validator(req.body)
    if (result !== true) {
        return res.status(409).json(result)
    }

    await teacherModel.create(req.body)
    res.status(201).json({ message: "teacher create successfully .." })
}

const remove = async (req, res) => {
    const { id } = req.params
    // check valid id
    if (id) {
        if (!isValidObjectId(id)) {
            return res.status(409).json({ message: "the id is not valid .." })
        }
    }

    // is exist teacher
    const isExist = await teacherModel.findOne({ _id: id })
    if (!isExist) {
        return res.status(404).json({ message: "the teacher not found .." })
    }

    // delete teacher 
    await teacherModel.findOneAndDelete({ _id: id })
    return res.json({ message: "teacher delete successfully .." })

}

const update = async (req, res) => {
    const { id } = req.params
    // check valid id
    if (id) {
        if (!isValidObjectId(id)) {
            return res.status(409).json({ message: "the id is not valid .." })
        }
    }

    // is exist teacher
    const isExist = await teacherModel.findOne({ _id: id })
    if (!isExist) {
        return res.status(404).json({ message: "the teacher not found .." })
    }



    // is valid data by fastest
    const result = validator(req.body)
    if (result !== true) {
        return res.status(409).json(result)
    }

    // update teacher
    await teacherModel.findOneAndUpdate({ _id: id }, {
        $set: req.body
    })

    return res.json({ message: "teacher update successfully .." })

}

module.exports = { getAll, create, remove, update }