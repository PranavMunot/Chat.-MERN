// sockets are rockets
import io from 'socket.io-client'

const socket = io.connect('https://chatbackend-74wf.onrender.com', {
    reconnectionAttempts: 5, // Maximum number of reconnection attempts
    reconnectionDelay: 1000, // Delay between each attempt (in milliseconds)
})

export default socket