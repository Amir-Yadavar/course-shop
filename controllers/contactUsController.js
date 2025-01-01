const createValidator = require("./../validators/contactUs/createContactUs")
const { model: contactUsModel } = require("./../models/ContactUs")


const getAll = async (req, res) => {
    // code
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

module.exports = { getAll, create }