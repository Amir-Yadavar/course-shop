const { model: courseModel } = require("./../models/Course")
const { model: sessionModel } = require("./../models/Session")
const { model: courseUserModel } = require("./../models/CourseUser")
const { isValidObjectId } = require("mongoose")
const validator = require("./../validators/course/courseCreateValid")
const validatorSession = require("./../validators/course/courseSessionValid")
const fs = require("fs")
const path = require("path")

const create = async (req, res) => {

    try {

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
    } catch (error) {
        console.log(error);
    }

}

const getAll = async (req, res) => {
    const allCourse = await courseModel.find({}, "-__v -createdAt -updatedAt")
        .populate("teacher", "name _id skills")
        .populate("categoryID", "-__v -createdAt -updatedAt")
    return res.json(allCourse)
}

const editCourse = async (req, res) => {
    try {

        // check id
        const { id } = req.params
        if (id) {
            if (!isValidObjectId(id)) {
                return res.status(409).json({ message: "the id is not valid .." })
            }
        }

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

        // find course and delete last cover
        const findCourse = await courseModel.findOne({ _id: id })

        if (findCourse.cover !== req.file.filename && req.file) {
            await fs.rm(`${path.join(__dirname, "..", "public", "courses", "covers")}/${findCourse.cover}`, (err, data) => {
                console.log(err);
            })
        }


        // edit course
        await courseModel.findOneAndUpdate({ _id: id }, {
            $set: {
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
            }
        })

        return res.status(201).json({ message: "course update successfully .." })

    } catch (error) {
        console.log(error);
    }
}

const courseUserRegister = async (req, res) => {
    const { id } = req.params
    const { price } = req.body
    // check id
    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id is not valid .." })
    }

    // check body
    if (typeof price !== "number" || !price) {
        return res.status(409).json({ message: "price is not valid .. " })
    }

    // check is user already registered in course

    const isUserAlreadyExistInCourse = await courseUserModel.findOne({ user: req.user._id, course: id })

    if (isUserAlreadyExistInCourse) {
        return res.status(409).json({ message: " user already registered in course" })
    }

    // create course user register

    await courseUserModel.create({ user: req.user._id, course: id, price })
    res.status(201).json({ message: "user register in course successfully .." })


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

const getAllSessions = async (req, res) => {

    const sessions = await sessionModel.find({}, "-__v").populate("course", "title")

    return res.json(sessions)

}

const removeSession = async (req, res) => {
    try {
        // check id 
        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(409).json({ message: "id is not valid .." })
        }


        // remove session
        const removeSession = await sessionModel.findOneAndDelete({ _id: id })
        if (!removeSession) {
            return res.status(404).json({ message: "session not found" })
        }

        return res.json(removeSession)

    } catch (error) {
        console.log(error);
    }
}


module.exports = { create, getAll, editCourse, courseUserRegister, addSession, getAllSessions, removeSession }