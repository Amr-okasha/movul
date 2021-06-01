const express = require("express")
const authUserControler = require('../controler/authUserControler')
const authMiddleware = require("../middleware/authmidleware")


const userRouter = express.Router()

userRouter.post("/signin", authUserControler.signin_post)
userRouter.post("/register", authUserControler.register_post)
userRouter.put("/update/:id", authMiddleware.requireAuth, authUserControler.update_put)
userRouter.delete("/deactivate/:id", authMiddleware.requireAuth, authUserControler.deactivate_delete)
userRouter.get("/logout", authUserControler.logout_get)

module.exports = { userRouter }