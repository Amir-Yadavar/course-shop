const userModel = require("./../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const userRegisterValid = require("../validators/user/userRegisterValid")
const loginUserValid = require("./../validators/user/loginUserValid")
const editUserValid = require("./../validators/user/editUserValid")


const register = async (req, res) => {
    try {
        // is valid data by fastest-validator
        const resultValidatorBody = await userRegisterValid(req.body)

        if (resultValidatorBody !== true) {
            return res.status("422").json(resultValidatorBody)
        }

        // get all body
        const { firstName, lastName, email, phone, password, confirmPassword } = req.body


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
            password: hashedPassword,
            confirmPassword
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
    try {
        // check data by fastest
        const isValidDataLogin = loginUserValid(req.body)
        if (isValidDataLogin !== true) {
            return res.status(409).json(isValidDataLogin)
        }

        //    get data from body
        const { identifier, password } = req.body

        // find user by phone
        const userFind = await userModel.findOne({ $or: [{ phone: identifier }, { email: identifier }] })
        if (!userFind) {
            return res.status(401).json({ message: "user not found by phone or email .." })
        }

        // check password

        const isCorrectPass = await bcrypt.compare(password, userFind.password)
        if (!isCorrectPass) {
            return res.status(401).json({ message: "password  not correct .." })
        }

        // set data  to send client

        const userFindObject = userFind.toObject()
        Reflect.deleteProperty(userFindObject, "__v")
        Reflect.deleteProperty(userFindObject, "password")

        // create token
        const token = jwt.sign({ email: userFind.email, phone: userFind.phone }, process.env.JWT_SECRET, { expiresIn: 15 * 60 * 1000 })
        return res.status(200).json({ user: userFindObject, token })

    } catch (error) {
        console.log(error);
    }
}

const getAll = async (req, res) => {
    const allUser = await userModel.find({}, "-password -__v -createdAt -updatedAt")
    return res.json(allUser)
}

const deleteUser = async (req, res) => {

    // get id from params and check valid
    const { id } = req.params
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "the is is not valid .." })
    }

    // find user and check role
    const findUser = await userModel.findOne({ _id: id }).lean()
    if (!findUser) {
        return res.status(404).json({ message: "user by id not find .." })
    }
    if (findUser.role === "ADMIN") {
        return res.status(409).json({ message: "user by role admin can not delete .." })
    }

    // delete user
    await userModel.deleteOne({ _id: id })
    res.status(200).json({ message: "delete user successfully .." })
}

const editUser = async (req, res) => {
    // get id from params and check

    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the id is not valid .." })
    }

    // get body and check
    const resultValidData = editUserValid(req.body)
    if (resultValidData !== true) {
        return res.status(422).json(resultValidData)
    }

    const { firstName, lastName, email, phone } = req.body

    // find user and update

    await userModel.findOneAndUpdate({ _id: id }, { $set: { firstName, lastName, email, phone } })
    res.status(201).json({ message: "user edit successfully .." })
}

const changeRole = async (req, res) => {
    // get body and check
    const { id, role } = req.body

    if (!isValidObjectId(id)) {
        return res.status(409).json({ message: "the id is not valid .." })
    }
    if (role !== "ADMIN" && role !== "USER") {
        return res.status(409).json({ message: "the value role must ADMIN or USER .." })
    }

    // find user and update role

    await userModel.findOneAndUpdate({ _id: id }, { $set: { role: role === "ADMIN" ? "ADMIN" : "USER" } })
    res.status(200).json({ message: "role change successfully .." })
}
const getMe = async (req, res) => {

}

const banUser = async (req, res) => {
    try {

        // get body

        const { isBan } = req.body
        if (isBan !== true && isBan !== false) {
            return res.status(409).json({ message: "the value isBan must true or false .." })
        }
        // get params
        const { id } = req.params
        if (!isValidObjectId(id)) {
            return res.status(404).json({ message: "the id is not valid .." })
        }


        // get  user
        const userFind = await userModel.findOneAndUpdate({ _id: id }, { $set: { isBan } })

        if (!userFind) {
            return res.status(404).json({ message: "the user is not exist .." })
        }



        res.status(201).json({ message: "the user edit status ban successfully" })

    } catch (error) {
        console.log(error);
    }



}


module.exports = { register, banUser, login, getAll, deleteUser, editUser, changeRole }