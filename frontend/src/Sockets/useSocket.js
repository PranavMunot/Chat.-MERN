
import { useContext, createContext, useEffect, useRef, useState, useCallback } from 'react'
import io from 'socket.io-client';

const SocketContext = createContext();

const SOCKET_CONFIG = {
    url: process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000/',
    options: {
        reconnectionAttempts: 10, // Maximum number of reconnection attempts
        reconnectionDelay: 1000, // Delay between each attempt (in milliseconds)
        reconnectionDelayMax: 5000,
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true
    }
}

export const SocketProvider = function ({ children }) {

    let socketRef = useRef(null);
    let [isConnected, setConnected] = useState(false);
    let eventQueue = useRef([])

    useEffect(() => {
        socketRef.current = io(SOCKET_CONFIG.url, SOCKET_CONFIG.options)
        const Socket = socketRef.current;
        Socket.on('connect', () => {
            setConnected(true);
            while (eventQueue.current.length > 0) {
                const { type, payload } = eventQueue.current.shift();
                Socket.emit(type, payload)
            }
        })

        Socket.on('disconnect', (reason) => {
            setConnected(false);
            // console.log('[Socket] Disconnected:', reason);

            // Auto-reconnect for certain disconnect reasons
            if (reason === 'io server disconnect') {
                Socket.connect();
            }
        });

        Socket.on('connect_error', (error) => {
            console.error('[Socket] Connection error:', error.message);
        });

        Socket.on('ping', () => {
            Socket.emit('pong')
        })

        return () => {
            Socket.removeAllListeners();
            Socket.disconnect();
            socketRef.current = null;
            eventQueue.current = [];
        }
    }, []);

    let emit = useCallback((type, payload = {}) => {
        if (!type) {
            console.error('Socket type cannot be empty for empty!');
            return;
        };
        if (socketRef.current && socketRef.current?.connected) {
            try {
                socketRef.current.emit(type, payload);
            } catch (error) {
                console.error('[Socket] Emit error:', error);
            }
        } else {
            eventQueue.current.push({ type, payload });
            if (eventQueue.current.length > 50) {
                console.warn('[Socket] Queue size exceeded 50 messages');
            }
        }
    }, [])
    let onSocket = useCallback((e, handler) => {
        if (!socketRef.current) {
            return () => { };
        }

        socketRef.current.on(e, handler);

        return () => {
            if (socketRef.current) {
                socketRef.current.off(e, handler);
            }
        }

    }, []);

    let offSocket = useCallback((e, handler) => {
        if (socketRef.current) {
            socketRef.current.off(e, handler);
        }
    }, [])


    return (
        <SocketContext.Provider value={{
            isConnected,
            socket: socketRef.current,
            emit,
            onSocket,
            offSocket
        }} >
            {children}
        </SocketContext.Provider >
    )
}

export const useSocket = () => {
    let ctx = useContext(SocketContext);
    if (!ctx) {
        throw new Error('Cannot use socket context before provider')
    }
    return ctx;
};


export const useSocketEvent = (event, handler) => {
    const { onSocket } = useSocket();
    const latestHandler = useRef(handler);

    useEffect(() => {
        latestHandler.current = handler
    }, [handler])

    useEffect(() => {
        if (!event || !handler) return;

        const internalHandle = (...args) => latestHandler.current?.(...args);

        const cleanup = onSocket(event, internalHandle);
        return cleanup;

    }, [event, onSocket])
}