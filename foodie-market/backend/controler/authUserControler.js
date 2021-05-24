const { USER } = require("../model/usermodel")
const jwt = require("jsonwebtoken")

const config = require("../config")

const handleErrors = (ex) => {
    console.log(ex)

    const error = { email: "", password: "" }

    // if (ex.code === 11000) {
    //     error.email = "this is an exist email please enter other one"
    //     return error
    // }
    if (ex.message.includes("USER validation failed")) {
        Object.values(ex.errors).map(({ properties }) => {
            console.log(properties)
            return error[properties.path] = properties.message
        })

    }
    return error
}
const maxAge = 2 * 24 * 60 * 60
const createToken = (info) => {

    return jwt.sign({ info }, config.SECRET, { expiresIn: maxAge })

}

const signin_post = async (req, res) => {
    const user = await USER.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (!user) {
        res.status(404).send("invalid username or password")

    } else {
        res.status(201).send(user)
    }
}
const register_post = async (req, res) => {


    console.log(req.body)


    try {
        const user = await new USER({
            email: req.body.email,
            password: req.body.password
        })
        const createdUser = await user.save()
        const Token = await createToken(createdUser)

        res.cookie("jwt", Token, { maxAge: maxAge * 1000, httpOnly: true })

        res.status(201).send({
            Token
            // _id: createdUser._id,
            // email: createdUser.email,
            // password: createdUser.password
        })
    } catch (ex) {
        const error = handleErrors(ex)
        res.status(401).send(error)
    }



    // const error = handleErrors(ex)





}

const update_post = async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await USER.findById(req.params.id)
        user._id = req.params.id
        user.email = req.body.email || user.email
        user.password = req.body.password || user.email
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            email: updatedUser.email,
            password: updatedUser.password
        })
    } catch (ex) {
        res.status(404).send({ message: "not found" })
    }


}

const deactivate_delete = async (req, res) => {
    const user = await USER.findById(req.params.id)
    if (!user) {
        res.status(404).send({ message: "user not found" })
    }

    else {

        await USER.findByIdAndRemove(req.params.id)
        res.send({ message: "user deactivated successfuly" })
    }
}

module.exports = { signin_post, register_post, update_post, deactivate_delete }



