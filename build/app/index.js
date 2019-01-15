"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const app_1 = require("./app");
const socket_server_1 = require("./socket/socket.server");
const PORT = 3000 || process.env.PORT;
app_1.default.set('port', PORT);
const SERVER = http.createServer(app_1.default);
new socket_server_1.SocketServer(SERVER);
SERVER.listen(PORT);
SERVER.on('error', onError);
SERVER.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof PORT === 'string') ? `Pipe ${PORT}` : `Port ${PORT}`;
    switch (error.code) {
        case 'EACCES':
            console.log(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = SERVER.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    debug(`Listening on ${bind}`);
}
//# sourceMappingURL=index.js.map