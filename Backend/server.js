const http = require('http');
const app = require('./app.js');
const { initSocket, getSocket } = require('./Controllers/initSocket.controller.js')
const server = http.createServer(app);
initSocket(server)
const io = getSocket();




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});







