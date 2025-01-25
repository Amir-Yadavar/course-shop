const { isValidObjectId } = require("mongoose")
const validator = require("./../validators/ticket/ticketCreateValid")
const { model: ticketModel } = require("./../models/Ticket")
const fs = require("fs")
const path = require("path")


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
            isAnswer: 0,
            creator: req.user._id,
            image: req.file && req.file.filename
        })

        return res.status(201).json({ message: "ticket create successfully .." })

    } catch (error) {
        console.log(error);
    }
}

const getAll = async (req, res) => {
    const allTicket = await ticketModel.find({}, "-__v")
        .populate("department", "title")
        .populate("subDepartment", "title")
        .populate("creator", "-password -__v")
    return res.json(allTicket)
}

const remove = async (req, res) => {
    try {

        const { id } = req.params

        if (!isValidObjectId(id)) {
            return res.status(409).json({ message: "id not valid .." })
        }

        const deleteTicket = await ticketModel.findOneAndDelete({ _id: id })

        if (!deleteTicket) {
            return res.status(404).json({ message: "ticket not found .." })
        }

        fs.rm(`${path.join(__dirname, "..", "public", "ticket")}/${deleteTicket.image}`, (error, data) => {
            console.log(error);
        })

        return res.json({ message: "remove ticket success .." })
    } catch (error) {
        console.log(error);
    }
}

const answer = async (req, res) => {
    try {
        const resultValid = validator(req.body)

        if (resultValid !== true) {
            return res.status(409).json(resultValid)
        }

        const {
            department,
            subDepartment,
            title,
            body,
            mainTicket
        } = req.body

        if (!isValidObjectId(department)) {
            return res.status(409).json({ message: "id department not valid .." })
        }
        if (!isValidObjectId(subDepartment)) {
            return res.status(409).json({ message: "id subDepartment not valid .." })
        }
        if (!isValidObjectId(mainTicket)) {
            return res.status(409).json({ message: "id mainTicket not valid .." })
        }

        await ticketModel.create({
            department,
            subDepartment,
            title,
            body,
            mainTicket,
            isAnswer: 1,
            creator: req.user._id,
            image: req.file && req.file.filename
        })

        return res.status(201).json({ message: "ticket answer create successfully .." })

    } catch (error) {
        console.log(error);
    }
}

const getAnswer = async (req, res) => {
    const allTicket = await ticketModel.find({},"-createdAt -updatedAt -__v").lean()
    .populate("department", "-createdAt -updatedAt -__v")
    .populate("subDepartment", "-createdAt -updatedAt -__v -department")
    .populate("creator", "firstName lastName")
    
       
        
    let tickets = []
    allTicket.forEach(item => {
        allTicket.forEach(answer => {
            if (String(answer.mainTicket) == String(item._id)) {
                tickets.push({
                    ...item,
                    replay: answer
                })
            }

        })

    })
    tickets = tickets.filter(item => String(item.creator._id) == String(req.user._id))
    return res.json(tickets)
}

module.exports = { create, getAll, remove, answer, getAnswer }