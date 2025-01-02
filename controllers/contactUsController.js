const createValidator = require("./../validators/contactUs/createContactUs")
const { model: contactUsModel } = require("./../models/ContactUs")
const { isValidObjectId } = require("mongoose")
const nodemailer = require("nodemailer")

const answer = async (req, res) => {

    const findContactUs = await contactUsModel.findOne({ email: req.body.email })

    if (!findContactUs) {
        return res.status(404).json({ message: "the email not found .." })
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "amiresya@gmail.com",
            pass: "app password 16 char in account"
        }
    })

    const optionMail = {
        from: "amiresya@gmail.com",
        to: req.body.email,
        subject: "پاسخ برای برنامه مورد نظر",
        text: req.body.answer
    }
    transporter.sendMail(optionMail, async (error, info) => {
        if (error) {
            return res.status(409).json(error)
        } else {
            await contactUsModel.findOneAndUpdate({ email: req.body.email }, { hasAnswer: true })
            return res.json({ message: "answer email send success .." })
        }


    })
}

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




module.exports = { getAll, create, remove, answer }