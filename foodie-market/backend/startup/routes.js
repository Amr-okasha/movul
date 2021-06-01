const authUserRoutes = require("../router/authUserRoutes")
const authUserMiddleware = require("../middleware/authmidleware")
const express = require("express")


module.exports = function (app) {
    app.use(express.json())
    app.use("*", authUserMiddleware.checkUser)
    app.use("/api", authUserRoutes.userRouter)
}