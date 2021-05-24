const express = require("express")
const authUserControler = require('../controler/authUserControler')


const userRouter = express.Router()

userRouter.post("/signin", authUserControler.signin_post)
userRouter.post("/register", authUserControler.register_post)
userRouter.put("/update/:id", authUserControler.update_post)
userRouter.delete("/deactivate/:id", authUserControler.deactivate_delete)


module.exports = { userRouter }