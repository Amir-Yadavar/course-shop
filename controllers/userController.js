const userModel = require("./../models/User")

const userRegisterValid = require("./../validators/userRegisterValid")

const register = async (req, res) => {

    // is valid data by fastest-validator
    const resultValidatorBody = userRegisterValid(req.body)

    if (!resultValidatorBody) {
        return res.status("422").json({ message: "the body is not valid" }, resultValidatorBody)
    }

    // get all body
    const { firstName, lastName, email, phone, password } = req.body

    
    // is user exist
    const isUserExist = await userModel.findOne({ $or: [{ email }, { phone }] })

    if (isUserExist) {
        return res.status(409).json({ message: "email or phone is exist" })
    }


}
const login = async (req, res) => {

}
const getMe = async (req, res) => {

}


module.exports = { register }