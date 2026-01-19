const socketio = require('socket.io')

const STATUS = {
    'online': 'online',
    'offline': 'offline',
    'typing': 'typing',
    'thinking': 'thinking'
}

class SocketService {
    // private variables
    #innerSocket

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
                // if (onlineUsers.get(userId)) {
                //     socket.to(onlineUsers.get(userId)).emit('duplicate-tab')
                // }
                onlineUsers.set(userId, { socketId: socket.id, data: { isOnline: true, currentStatus: STATUS['online'] } })
                console.log(31, onlineUsers)
            })

            socket.on('recieve-user-add-request', ({ RecieverChatCode, SenderChatCode }) => {
                if (onlineUsers.has(RecieverChatCode) && onlineUsers.has(SenderChatCode)) {
                    this.requestRecieverUser = onlineUsers.get(RecieverChatCode)['socketId']
                    this.requestSenderUser = onlineUsers.get(SenderChatCode)['socketId']
                }
            })

            socket.on('send-message-to-friend', ({ friendChatCode, messageId }) => {
                if (onlineUsers.has(friendChatCode)) {
                    let sendingMessageToUser = onlineUsers.get(friendChatCode)['socketId']
                    // TODO: send message id instead of complete message
                    this.io.to(sendingMessageToUser).emit('recieved-message', { to: sendingMessageToUser, from: socket.id, messageId })
                }

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