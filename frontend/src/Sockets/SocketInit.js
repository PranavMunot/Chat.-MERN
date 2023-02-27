// sockets are rockets
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000', {
    reconnectionAttempts: 5, // Maximum number of reconnection attempts
    reconnectionDelay: 1000, // Delay between each attempt (in milliseconds)
})

export default socket