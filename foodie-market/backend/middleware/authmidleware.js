const jwt = require("jsonwebtoken")
const config = require("../config/custom-environment-variables")
const configure = require("config")
const { USER } = require("../model/usermodel")

const requireAuth = (req, res, next) => {
    if (!configure.get("Requires-Auth")) return next()
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(Token, config.SECRET, (ex, decodedToken) => {
            if (ex) { res.status(400).send("Invalid access you not alowed to operation") }
            else { next() }
        })
    } else {
        res.status(400).send("Invalid access you not alowed to proceed this operation")
    }


}

const checkUser = (req, res, next) => {
    if (!configure.get("Requires-Auth")) return next()
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(Token, config.SECRET, (ex, decodedToken) => {
            if (ex) { res.status(400).send("Invalid access you not alowed to operation") }
            else {
                const user = USER.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }


}

module.exports = { requireAuth, checkUser }