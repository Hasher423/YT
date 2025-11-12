import { io } from 'socket.io-client';

let socket;

if (!socket) {
  socket = io('https://ytbackendtwo-production.up.railway.app/', {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    timeout: 20000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  console.log('Attempting to connect to Socket.IO server...');

  socket.on('connect', () => {
    console.log('Successfully connected to Socket.IO server');
    console.log('Socket ID:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Disconnected:', reason);
  });

  socket.on('connect_error', (err) => {
    console.log('Connection error:', err.message);
  });
}

export default socket;