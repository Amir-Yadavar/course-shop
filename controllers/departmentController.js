const { isValidObjectId } = require("mongoose")
const { model: departmentModel } = require("./../models/Department")


const getAll = async (req, res) => {
    const allDepartment = await departmentModel.find({})

    return res.json(allDepartment)
}

const create = async (req, res) => {
    const { title } = req.body

    if (!title) {
        return res.status(409).json({ message: "title is required .." })
    }
    try {
        await departmentModel.create({ title })
        return res.status(201).json({ message: "department create successfully .." })
    } catch (error) {
        console.log(error);
    }


}
const remove = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const removeDepartment = await departmentModel.findOneAndDelete({ _id: id })

    if (!removeDepartment) {
        return res.status(404).json({ message: "this item not found .." })
    }

    return res.json({ message: "remove department successfully .." })
}
const edit = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const { title } = req.body

    if (!title) {
        return res.status(409).json({ message: "title is required .." })
    }

    const updateDepartment = await departmentModel.findOneAndUpdate({ _id: id }, { title })

    if (!updateDepartment) {
        return res.status(404).json({ message: "this item not found .." })
    }
    return res.json({ message: "update department successfully .." })
}

module.exports = { getAll, create, remove, edit }