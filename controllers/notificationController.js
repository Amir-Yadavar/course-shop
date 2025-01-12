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

// getOne

module.exports = { create,getAll }