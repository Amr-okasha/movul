const data = require("./data")
const express = require("express")
const app = express()



require("./startup/cookieparser")(app)
require("./startup/portlisten")(app)
require("./startup/cors")(app)
require("./startup/routes")(app)
require("./startup/db")()
require("./startup/config")()




app.get("/api/products", (req, res) => {
    res.send(data)
})
app.post("/api/products", (req, res) => {
    res.send(data)
})



