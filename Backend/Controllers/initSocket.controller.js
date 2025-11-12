const socketServer = require('socket.io')
let io;

const socketIdMap = new Map();
let id;
const initSocket = (httpServer) => {
    io = socketServer(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:3000"], // allow specific origins
            methods: ["GET", "POST"],
            credentials: true, // allow credentials
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);
        socketIdMap.set(socket.id, socket)
         id  = socket.id

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;


}

const getSocket = () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
}

module.exports = { initSocket, getSocket, id }
