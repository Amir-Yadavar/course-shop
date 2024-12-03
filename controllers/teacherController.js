const { model: teacherModel } = require("./../models/Teacher")

const getAll = async (req, res) => {

}

const create = async (req, res) => {
    // is valid data by fastest
    console.log(req.body);

    await teacherModel.create(req.body)
    res.status(201).json({ message: "teacher create successfully .." })
}

const remove = async (req, res) => {

}

const update = async (req, res) => { }

module.exports = { getAll, create, remove, update }