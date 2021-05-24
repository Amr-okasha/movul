const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        email: 1,
        unique: true,
        required: [true, "Please enter you email"],
        lowercase: [true, "Letters should be alowercase"],
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter you password"],
        minlength: [6, "Min length should be 6 letters"]
    }
})


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log("aaaaaaaaaa", this)
    next()
})

const USER = mongoose.model("USER", userSchema)
module.exports = { USER }