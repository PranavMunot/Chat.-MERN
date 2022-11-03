require("dotenv").config()
const app = require("./app")

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server Started @ port ${process.env.PORT}`)
})