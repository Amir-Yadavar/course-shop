const { model: courseModel } = require("./../models/Course")
const { model: sessionModel } = require("./../models/Session")
const { isValidObjectId } = require("mongoose")
const validator = require("./../validators/course/courseCreateValid")
const validatorSession = require("./../validators/course/courseSessionValid")

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

const addSession = async (req, res) => {
    // is valid objectId course
    const { id } = req.params
    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the course id is not valid .." })
    }

    // is valid body 
    const resultCheck = validatorSession(req.body)
    if (resultCheck !== true) {
        return res.status(409).json(resultCheck)
    }

    // get body
    const { title, isFree, time } = req.body

    await sessionModel.create({ title, isFree, time, video: "test.mp4", course: id })
    return res.status(201).json({ message: "session create successfully .." })
}


module.exports = { create, getAll, addSession }