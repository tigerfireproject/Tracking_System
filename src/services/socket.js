// src/services/socket.js
import io from 'socket.io-client';

let socket;

export const initializeSocket = (onBusUpdate) => {
    socket = io(process.env.REACT_APP_SOCKET_URL);
    
    socket.on('connect', () => {
        console.log('Connected to socket server');
    });

    socket.on('busUpdate', (data) => {
        onBusUpdate(data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};