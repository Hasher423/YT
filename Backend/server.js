const http = require('http');
const app  = require('./app.js');

const server  = http.createServer(app);


server.listen(process.env.PORT, () =>{
    console.log('Server is running at port 3000');
})








