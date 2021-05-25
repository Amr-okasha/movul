const jwt = require("jsonwebtoken")
const config = require("../config")

const requireAuth = (req, res, next) => {
    if (true) return next()
    const token = req.body.cookies.jwt
    if (token) {
        jwt.verify(Token, config.SECRET, (ex, decodedToken) => {
            if (ex) { res.status(400).send("Invalid access you not alowed to operation") }
            else { next() }
        })
    } else {
        res.status(400).send("Invalid access you not alowed to proceed this operation")
    }


}

module.exports = { requireAuth }