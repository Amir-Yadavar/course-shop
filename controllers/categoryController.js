const createValid = require("./../validators/category/categoryCreateValid")
const { model: categoryModel } = require("./../models/Category")


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

}

const updateCategory = async (req, res) => {

}

module.exports = { createCategory, getAllCategory, deleteCategory, updateCategory }