const { isValidObjectId } = require("mongoose")
const { model: newsletterModel } = require("./../models/Newsletter")

const create = async (req, res) => {

    const { email } = req.body

    // validation
    const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
    const resultRegex = pattern.test(email)

    if (resultRegex) {
        await newsletterModel.create({ email })
        return res.status(201).json({ message: "email confirm in newsletter successfully .." })
    } else {
        return res.status(409).json({ message: "the email not valid .." })

    }

}
const getAll = async (req, res) => {
    const newsletterEmail = await newsletterModel.find({})
    return res.json(newsletterEmail)
}

const remove = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the is is not valid .." })
    }

    const removeNewsletter = await newsletterModel.findOneAndDelete({ _id: id })

    if (removeNewsletter) {
        return res.json({ message: "remove newsletter successfully .." })
    } else {
        return res.status(404).json({ message: "newsletter not found .." })
    }

}

module.exports = { create, getAll, remove }