import http from 'http';
import app from './app';
import { Server } from 'socket.io';
import { handleSocket } from './socket';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const PORT = process.env.PORT;

const httpServer = http.createServer(app)

// create io server too here
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    },
})

handleSocket(io)

httpServer.listen(PORT, () => {
    console.log("listening to port " + PORT)
});
