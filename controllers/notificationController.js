const { isValidObjectId } = require("mongoose")
const userModel = require("./../models/User")
const { model: notificationModel } = require("./../models/Notification")

const create = async (req, res) => {
    const { message, adminID } = req.body

    // validation for id
    if (!isValidObjectId(adminID)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    // the user is exist and is admin

    const adminFind = await userModel.find({ _id: adminID, role: "ADMIN" })

    if (!adminFind.length) {
        return res.status(404).json({ message: "admin not found .." })
    }

    await notificationModel.create({ message, adminID })
    return res.status(201).json({ message: "notification create successfully .." })
}

const getAll = async (req, res) => {
    const getAllNotification = await notificationModel.find({})
    return res.json(getAllNotification)
}

// remove

const remove = async (req, res) => {
    const { id } = req.params

    // valid id ?

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const findItemRemove = await notificationModel.findOneAndDelete({ _id: id })
    if (!findItemRemove) {
        return res.status(404).json({ message: "notification not found .." })
    } else {
        return res.json({ message: "remove item success .." })
    }
}

// getOne

const getOne = async (req, res) => {
    const { id } = req.params

    // valid id ?

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const findItem = await notificationModel.findOne({ _id: id })
    if (!findItem) {
        return res.status(404).json({ message: "notification not found .." })
    } else {
        return res.json(findItem)
    }
}

// seen
const seen = async (req, res) => {
    const { id } = req.params

    // valid id ?

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "id not valid .." })
    }

    const findItemUpdate = await notificationModel.findOneAndUpdate({ _id: id }, { seen: 1 })
    if (!findItemUpdate) {
        return res.status(404).json({ message: "notification not found .." })
    } else {
        return res.json({ message: "notification edited .." })
    }
}

module.exports = { create, getAll, getOne, remove, seen }