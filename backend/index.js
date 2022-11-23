require("dotenv").config()
const app = require("./app")
const ConnectDB = require('./Database/Config/ConnectDB')

ConnectDB()

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server Started @ port ${process.env.PORT}`)
})