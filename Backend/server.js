const http = require('http');
const app = require('./app.js');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // or your frontend origin
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.set('io', io); // pass io to use in routes/controllers



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});







