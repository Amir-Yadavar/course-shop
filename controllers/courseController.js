const validator = require("./../validators/course/courseCreateValid")
const { model: courseModel } = require("./../models/Course")

const create = async (req, res) => {
    // check data by fastest

    const result = validator(req.body)

    if (result !== true) {
        return res.status(409).json(result)
    }

    const {
        title,
        description,
        support,
        href,
        price,
        discount,
        score,
        lastUpdate,
        categoryID,
        teacher,
        statusProgress
    } = req.body

    await courseModel.create({
        title,
        description,
        support,
        href,
        price,
        discount,
        score,
        lastUpdate,
        categoryID,
        teacher,
        statusProgress,
        cover: req.file.filename
    })

    return res.status(201).json({ message: "course create successfully .." })

}

const getAll = async (req, res) => {
    const allCourse = await courseModel.find({}, "-__v -createdAt -updatedAt")
        .populate("teacher", "name _id skills")
        .populate("categoryID", "-__v -createdAt -updatedAt")
    return res.json(allCourse)
}


module.exports = { create, getAll }