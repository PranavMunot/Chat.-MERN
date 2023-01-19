const socketio = require('socket.io')

class SocketService {
    // private variables
    #innerSocket //private variable to save inner socket 

    constructor(server) {
        this.#innerSocket = null
        this.requestRecieverUser = null
        this.requestSenderUser = null
        this.io = socketio(server, {
            cors: {
                origin: "*",
            }
        });

        this.io.on('connection', (socket) => {
            this.#innerSocket = socket
            // global.socket = socket
            socket.on('online-user', ({ userId }) => {
                onlineUsers.set(userId, socket.id)
                console.log(onlineUsers)
            })

            socket.on('recieve-user-add-request', ({ RecieverChatCode, SenderChatCode }) => {
                this.requestRecieverUser = onlineUsers.get(RecieverChatCode)
                this.requestSenderUser = onlineUsers.get(SenderChatCode)
            })

            socket.on('disconnect', (reason) => {
                console.log(`disConnected ${socket.id}`)
                onlineUsers.delete(socket.id)
                console.log(reason)
            })
        })


    }

    emitToSenderRequest(event, body) {
        if (body) {
            this.io.to(this.requestRecieverUser).emit(event, body)
        }
    }

    emitToRecieverRequest(event, body) {
        if (body && this.requestSenderUser) {
            this.io.to(this.requestSenderUser).emit(event, body)
        }
    }
}

module.exports = SocketService