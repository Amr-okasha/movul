const config = require("../config/custom-environment-variables")
const mongoose = require("mongoose")

module.exports = function () {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(res => console.log("mongoose connected"))
        .catch(err => console.log(err))
}
