import { io } from 'socket.io-client';

// Create socket connection with detailed logging
const socket = io('https://ytbackendtwo-production.up.railway.app/', {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  timeout: 10000,
  forceNew: true,
});

// Enhanced connection logging
console.log('🔌 Attempting to connect to Socket.IO server...');

// Connection event handlers
socket.on('connect', () => {
  console.log('✅ Successfully connected to Socket.IO server');
  console.log('🔑 Socket ID:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Disconnected from Socket.IO server:', reason);
});

export default socket;
