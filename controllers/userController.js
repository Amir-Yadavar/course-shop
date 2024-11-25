const userModel = require("./../models/User")
const { model: banUserModel } = require("./../models/BanUser")
const bcrypt = require("bcrypt")
const userRegisterValid = require("./../validators/userRegisterValid")
const banUserValid = require('./../validators/banUserValid')
const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")



const register = async (req, res) => {
    try {
        // is valid data by fastest-validator
        const resultValidatorBody = await userRegisterValid(req.body)

        if (resultValidatorBody !== true) {
            return res.status("422").json(resultValidatorBody)
        }

        // get all body
        const { firstName, lastName, email, phone, password } = req.body


        // is user exist
        const isUserExist = await userModel.findOne({ $or: [{ email }, { phone }] })

        if (isUserExist) {
            return res.status(409).json({ message: "email or phone is exist" })
        }


        // hashed password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        // generate jwt
        const token = jwt.sign({ email, phone }, process.env.JWT_SECRET, { expiresIn: 15 * 60 * 1000, algorithm: "HS256" })


        // get all user for count user
        const countOfUsers = await userModel.find({})

        // create new user
        const newUser = await userModel.create({
            role: countOfUsers.length > 0 ? "USER" : "ADMIN",
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword
        })

        const userObj = newUser.toObject()
        Reflect.deleteProperty(userObj, "password")
        Reflect.deleteProperty(userObj, "__v")

        res.status(201).json({ user: userObj, token })
    } catch (error) {
        console.log(error);
    }



}

const login = async (req, res) => {

}
const getMe = async (req, res) => {

}

const banUser = async (req, res) => {
    try {

        // get params
        const { id } = req.params
        if (!isValidObjectId(id)) {
            return res.status(404).json({ message: "the id is not valid .." })
        }


        // get  user
        const userFind = await userModel.findOne({ _id: id })

        if (!userFind) {
            return res.status(404).json({ message: "the user is not exist .." })
        }

        const dataSend = {
            firstName: userFind.firstName,
            lastName: userFind.lastName,
            phone: userFind.phone
        }

        // is valid data by  fastest
        const isValidData = banUserValid(dataSend)
        if (isValidData !== true) {
            return res.status(422).json(isValidData)
        }

        // get all ban user
        const getAllBanUser = await banUserModel.find({ phone: userFind.phone })

        if (getAllBanUser.length > 0) {
            return res.status(409).json({ message: "the user already is ban .." })
        }

        // ban user
        const banUserAdd = await banUserModel.create(dataSend)

        res.status(201).json({ message: "the user ban successfully", user: banUserAdd })

    } catch (error) {
        console.log(error);
    }



}


module.exports = { register, banUser }