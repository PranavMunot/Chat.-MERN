require("dotenv").config()
const app = require("./app")
const ConnectDB = require('./Database/Config/ConnectDB')
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "*",
    }
})
// const SocketService = require('./Sockets/SocketService')

ConnectDB()

global.onlineUsers = new Map()

io.on('connection', (socket) => {
    socket.on('online-user', (userId) => {
        onlineUsers.set(socket.id, userId)
        console.log(onlineUsers)
    })

    socket.on('disconnect', (reason) => {
        console.log(`disConnected ${socket.id}`)
        onlineUsers.delete(socket.id)
        console.log(reason)
    })
})


httpServer.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`)
})







