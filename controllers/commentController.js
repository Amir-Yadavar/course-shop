const createValidator = require("./../validators/comment/createCommentValid")
const { model: courseModel } = require("./../models/Course")
const { model: commentModel } = require("./../models/Comments")
const { isValidObjectId } = require("mongoose")

const create = async (req, res) => {
    try {
        // check body by fastest
        const resultCheck = createValidator(req.body)
        if (resultCheck !== true) {
            return res.status(409).json(resultCheck)
        }

        const { body, course, score, isAnswer } = req.body


        // find course
        const findCourse = await courseModel.findOne({ href: course })

        if (findCourse) {
            // create comment
            await commentModel.create({
                body,
                creator: req.user._id,
                course: findCourse._id,
                score,
                isAnswer
            })

            res.status(201).json({ message: "comment create successfully .." })
        }
    } catch (error) {
        console.log(error);
    }


}

const remove = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const findCommentAndRemove = await commentModel.findOneAndDelete({ _id: id })

    if (findCommentAndRemove) {
        return res.json({ message: "comment delete successfully .. " })
    } else {
        return res.status(404).json({ message: "comment not found .." })
    }
}

module.exports = { create, remove }