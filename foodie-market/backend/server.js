const express = require("express")
const mongoose = require("mongoose")
const data = require("./data")
const config = require("./config")
const authUserRoutes = require("./router/authUserRoutes")
const cookieParser = require("cookie-parser")
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(res => app.listen(3990, () => console.log("connected at port 3990")))
    .catch(err => console.log(err))


const app = express()


app.use(express.json())
app.use("/api", authUserRoutes.userRouter)
app.use(cookieParser())
app.get("/api/products", (req, res) => {
    res.send(data)
})
app.post("/api/products", (req, res) => {
    res.send(data)
})
// app.get("/set-cookie", (req, res) => {
//     // res.setHeader("Set-Cookie", "newuser=true")
//     res.cookie("newuser", false)
//     res.cookie("isAdmin", true, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
//     res.send("you got the cookie")
// })
// app.get("/read-cookie", (req, res) => {

//     const cookie = req.cookies
//     res.send(cookie)

// })


