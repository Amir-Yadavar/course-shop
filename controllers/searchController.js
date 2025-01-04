const { model: courseModel } = require("./../models/Course")

const getCourse = async (req, res) => {
    const { keyword } = req.params

    const findCourse = await courseModel.find({
        title: { $regex: ".*" + keyword + ".*" }
    })
    return res.json(findCourse)
}

module.exports = { getCourse }