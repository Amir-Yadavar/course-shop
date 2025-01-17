const { isValidObjectId } = require("mongoose")
const { model: courseUserModel } = require("./../models/CourseUser")

const getAll = async (req, res) => {
    const allOrder = await courseUserModel.find({ user: req.user._id }).populate("course", "title href")
    return res.json(allOrder)
}
const getOne = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(409).json({ message: "the id not valid .." })
        }

        const order = await courseUserModel.findOne({ course: id, user: req.user._id }).populate("course")

        if (!order) {
            return res.status(404).json({ message: "the course not found .." })
        }

        return res.json(order)
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAll, getOne }