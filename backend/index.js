require("dotenv").config()
const app = require("./app")
const ConnectDB = require('./Database/Config/ConnectDB')
const httpServer = require('http').createServer(app)
const SocketService = require('./Sockets/SocketService')

ConnectDB()

global.onlineUsers = new Map()

app.set('socket', new SocketService(httpServer))


httpServer.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`)
})







