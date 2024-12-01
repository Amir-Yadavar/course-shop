const createValid = require("./../validators/category/categoryCreateValid")
const { model: categoryModel } = require("./../models/Category")
const { isValidObjectId } = require("mongoose")


const createCategory = async (req, res) => {
    // check body by fastest valid
    const resultValid = createValid(req.body)

    if (resultValid !== true) {
        return res.status(409).json(resultValid)
    }

    // get body

    const { title, href } = req.body

    await categoryModel.create({ title, href })

    return res.status(201).json({ message: "category create successfully .." })

}

const getAllCategory = async (req, res) => {

    const getAll = await categoryModel.find({}, "-__v -createdAt -updatedAt")

    return res.json(getAll)

}

const deleteCategory = async (req, res) => {
    // get id from params
    const { id } = req.params

    // is id valid
    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id is not valid .." })
    }

    // find category
    const category = await categoryModel.find({ _id: id })
    if (category.length < 1) {
        return res.status(404).json({ message: "category not exist .." })
    }

    await categoryModel.findOneAndDelete({ _id: id })
    return res.json({ message: "category delete successfully .." })

}

const updateCategory = async (req, res) => {
    // get id from params
    const { id } = req.params

    // is id valid
    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id is not valid .." })
    }

    // find category
    const category = await categoryModel.find({ _id: id })
    if (category.length < 1) {
        return res.status(404).json({ message: "category not exist .." })
    }

    // check body by fastest valid
    const resultValid = createValid(req.body)

    if (resultValid !== true) {
        return res.status(409).json(resultValid)
    }

    // get body

    const { title, href } = req.body

    // update category
    await categoryModel.findOneAndUpdate({ _id: id }, {
        $set: { title, href }
    })

    return res.json({ message: "category update successfully .." })
}

module.exports = { createCategory, getAllCategory, deleteCategory, updateCategory }