const { isValidObjectId } = require("mongoose")
const validator = require("./../validators/ticket/ticketCreateValid")
const { model: ticketModel } = require("./../models/Ticket")

const create = async (req, res) => {
    try {
        const resultValid = validator(req.body)

        if (resultValid !== true) {
            return res.status(409).json(resultValid)
        }

        const {
            department,
            subDepartment,
            title,
            body
        } = req.body

        if (!isValidObjectId(department)) {
            return res.status(409).json({ message: "id department not valid .." })
        }
        if (!isValidObjectId(subDepartment)) {
            return res.status(409).json({ message: "id subDepartment not valid .." })
        }

        await ticketModel.create({
            department,
            subDepartment,
            title,
            body,
            creator: req.user._id,
            image: req.file.filename
        })

        return res.status(201).json({ message: "ticket create successfully .." })

    } catch (error) {
        console.log(error);
    }
}

const getAll = async (req, res) => {
    const allTicket = await ticketModel.find({},"-__v")
        .populate("department" , "title")
        .populate("subDepartment" , "title")
        .populate("creator","-password -__v")
    return res.json(allTicket)
}

module.exports = { create, getAll }