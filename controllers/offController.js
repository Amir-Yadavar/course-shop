const validator = require("./../validators/off/offCreateValidator")
const { model: offModel } = require("./../models/Off")
const { model: courseModel } = require("./../models/Course")
const { isValidObjectId } = require("mongoose")

const getOne = async (req, res) => {
    try {
        const { code } = req.params
        const { course } = req.body

        // check course id
        if (!isValidObjectId(course)) {
            return res.status(409).json({ message: "the id not valid .." })
        }

        const findOff = await offModel.findOne({ code, course })

        // code not found
        if (!findOff) {
            return res.status(409).json({ message: "code discount not found .." })
        }

        // check usage
        if (findOff.max == findOff.usage) {
            return res.status(409).json({ message: "code already is usage .." })
        }

        return res.json(findOff)
    } catch (error) {
        console.log(error);
    }

}

const getAll = async (req, res) => {
    const allDiscount = await offModel.find({}, "-__v -createdAt -updatedAt").populate("course", "title href price").populate("creator", "firstName lastName phone")
    return res.json(allDiscount)
}

const remove = async (req, res) => {

}

const create = async (req, res) => {
    // valid body by fastest
    const resultValid = validator(req.body)
    if (resultValid !== true) {
        return res.status(409).json(resultValid)
    }

    const {
        code,
        percent,
        course,
        creator,
        max
    } = req.body

    await offModel.create({
        code,
        percent,
        course,
        creator,
        max
    })

    return res.status(201).json({ message: "code off for discount create successfully .." })
}
const campaign = async (req, res) => {

    // valid body 


    const {
        discount
    } = req.body

    // if (!discount) {
    //     return res.status(409).json({ message: "the discount not valid .." })
    // }

    await courseModel.updateMany({
        discount
    })

    return res.status(201).json({ message: "code off for discount create successfully .." })

}

module.exports = { getAll, remove, create, campaign, getOne }