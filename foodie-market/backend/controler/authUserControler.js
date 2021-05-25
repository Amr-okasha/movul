const { USER } = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const config = require("../config")

const handleErrors = (ex) => {
    console.log(ex)

    const error = { email: "", password: "" }
    //handle error of dublicate
    // if (ex.code === 11000) {
    //     error.email = "this is an exist email please enter other one"
    //     return error
    // }

    //handle schema errors
    if (ex.message.includes("USER validation failed")) {
        Object.values(ex.errors).map(({ properties }) => {
            console.log(properties)
            return error[properties.path] = properties.message
        })
    }

    // handle throw errors
    if (ex.message.includes("In correct email")) {
        return error.email = "In correct email"
    }

    if (ex.message.includes("In correct password")) {
        return error.password = "In correct password"
    }

    if (ex.message.includes("Registred")) {
        return error.email = "Registred email please write other one"
    }

    if (ex.message.includes("User not found")) {
        return error.email = "This email has been deleted"
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
    })

    try {
        if (!user) {
            // return res.status(404).send({ email: "Email is not matched " })
            throw Error("In correct email")

        }
        else {
            const auth = await bcrypt.compare(req.body.password, user.password)
            if (!auth) {
                throw Error("In correct password")
            } else {
                const Token = createToken({ userE: user.email, userId: user._id })
                res.header({ "x-auth-token": Token })
                res.cookie("jwt", Token, { maxAge: maxAge * 1000 })
                res.status(201).send(Token)

            }
        }
    } catch (ex) {
        console.log(ex.message)
        const error = handleErrors(ex)
        res.status(404).send(error)
    }

}
const register_post = async (req, res) => {


    console.log(req.body)



    try {
        const checkUser = await USER.findOne({
            email: req.body.email,
        })
        if (checkUser) throw Error("Registred")
        const user = await new USER({
            email: req.body.email,
            password: req.body.password
        })
        const createdUser = await user.save()
        const Token = await createToken({ userE: createdUser.email, createdUser: user._id })

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
        const Token = createToken({ userE: updatedUser.email, updatedUser: user._id })
        res.cookie("jwt", Token, { maxAge: maxAge * 1000 })
        res.send({
            Token
            // _id: updatedUser._id,
            // email: updatedUser.email,
            // password: updatedUser.password
        })

    } catch (ex) {
        res.status(404).send({ message: "Error in connection" })
    }


}

const deactivate_delete = async (req, res) => {
    try {
        const user = await USER.findById(req.params.id)
        if (!user) {
            throw Error("User not found")
        }

        else {

            const user = await USER.findByIdAndRemove(req.params.id)
            res.cookie("jwt", "", { maxAge: 0 })
            res.send({ message: "user deactivated successfuly" })
        }
    } catch (ex) {
        const error = handleErrors(ex)
        res.status(404).send(error)
    }


}

module.exports = { signin_post, register_post, update_post, deactivate_delete }



