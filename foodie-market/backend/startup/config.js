const confg = require("config")


module.exports = function () {
    if (!confg.get("jwtPrivateKey-Secret")) throw Error("FatalError :jwtPrivateKey undifined")
}