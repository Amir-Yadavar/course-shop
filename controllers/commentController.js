const createValidator = require("./../validators/comment/createCommentValid")
const { model: courseModel } = require("./../models/Course")
const { model: commentModel } = require("./../models/Comments")

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

module.exports = { create }