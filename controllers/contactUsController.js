const createValidator = require("./../validators/contactUs/createContactUs")
const { model: contactUsModel } = require("./../models/ContactUs")
const { isValidObjectId } = require("mongoose")


const getAll = async (req, res) => {
    // code

    const contacts = await contactUsModel.find({})
    return res.json(contacts)
}
const create = async (req, res) => {

    // check valid body by fastest
    const isValidBody = createValidator(req.body)

    if (isValidBody !== true) {
        return res.status(409).json(isValidBody)
    }

    // create a contactUs
    await contactUsModel.create(req.body)
    return res.status(201).json({ message: "create contactUs successfully .." })

}

const remove = async (req, res) => {
    // params
    const { id } = req.params

    // is valid id
    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id is not valid .." })
    }

    const removeContact = await contactUsModel.findOneAndDelete({ _id: id })

    if (!removeContact) {
        return res.status(404).json({ message: "item not found .." })
    }
    return res.json({ message: "contact remove successfully .." })
}

module.exports = { getAll, create, remove }