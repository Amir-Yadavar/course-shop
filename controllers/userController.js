const userModel = require("./../models/User")
const bcrypt = require("bcrypt")
const userRegisterValid = require("./../validators/userRegisterValid")
const jwt = require("jsonwebtoken")

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


module.exports = { register }