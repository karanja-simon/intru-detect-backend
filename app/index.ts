import * as http from 'http';
import * as debug from 'debug';
import app from './app';
import {SocketServer} from './socket/socket.server';

const PORT = 3000 || process.env.PORT;

app.set('port', PORT);

const SERVER = http.createServer(app);
new SocketServer(SERVER);

SERVER.listen(PORT);
SERVER.on('error', onError);
SERVER.on('listening', onListening);

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof PORT === 'string') ? `Pipe ${PORT}` : `Port ${PORT}`;
    switch (error.code){
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

function onListening(): void {
    let addr = SERVER.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    debug(`Listening on ${bind}`); 
}
