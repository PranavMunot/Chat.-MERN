const socketio = require('socket.io')

class SocketService {
    constructor(server) {
        this.io = socketio(server, {
            cors: {
                origin: "*",
            }
        });

    }

    emiter(event, body) {
        if (body)

            this.io.emit(event, body)

    }
}

module.exports = SocketService