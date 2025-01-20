const { model: subDepartmentModel } = require("./../models/SubDepartment")
const { model: departmentModel } = require("./../models/Department")
const { isValidObjectId } = require("mongoose")

const getAll = async (req, res) => {
    const allSubDepartment = await subDepartmentModel.find({})
    return res.json(allSubDepartment)
}
const create = async (req, res) => {

    const { title, department } = req.body

    if (!title) {
        return res.status(409).json({ message: "title is required .." })
    }

    if (!isValidObjectId(department)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    let findDepartment = await departmentModel.findOne({ _id: department })


    if (!findDepartment) {
        return res.status(404).json({ message: "the department not found" })
    }


    await subDepartmentModel.create({ title, department })
    return res.status(201).json({ message: "subDepartment create  successfully .." })

}
const remove = async (req, res) => { }
const edit = async (req, res) => { }

module.exports = { getAll, create, remove, edit }