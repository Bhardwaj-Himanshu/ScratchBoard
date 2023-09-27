//declaring a variable http which requires http package
const http = require('http');
const app = require('./app');
// either chooses port automatically from environment varibales or we have assigned it as 3000
const port = process.env.PORT || 3000;
// server is made using createServer() method on http variable
const server = http.createServer(app);
// server listens on this particular port
server.listen(port);