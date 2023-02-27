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
            socket.on('online-user', ({ userId }) => {
                if (onlineUsers.get(userId)) {
                    socket.to(onlineUsers.get(userId)).emit('duplicate-tab')
                }
                onlineUsers.set(userId, socket.id)
                console.log(`${socket.id} got added`)
                console.log(onlineUsers)
            })

            socket.on('recieve-user-add-request', ({ RecieverChatCode, SenderChatCode }) => {
                this.requestRecieverUser = onlineUsers.get(RecieverChatCode)
                this.requestSenderUser = onlineUsers.get(SenderChatCode)
            })

            socket.on('send-message-to-friend', ({ friendChatCode, message }) => {
                let sendingMessageToUser = onlineUsers.get(friendChatCode)
                this.io.to(sendingMessageToUser).emit('recieved-message', { to: sendingMessageToUser, from: socket.id, message })
            })

            socket.on('disconnect', (reason) => {
                console.log(`disConnected ${socket.id} due to ${reason}`)
                console.log(onlineUsers)

                onlineUsers.delete(socket.id)
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