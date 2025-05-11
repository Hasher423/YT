const http = require('http');
const app  = require('./app.js');

const server  = http.createServer(app);

const serverless = require('serverless-http');



module.exports.handler = serverless(app);







