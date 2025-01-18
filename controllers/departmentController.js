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

}
const edit = async (req, res) => {

}

module.exports = { getAll, create, remove, edit }