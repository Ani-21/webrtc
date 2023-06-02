import { Server } from 'socket.io';

import { auth } from '../services/socket/auth';
import { onConnection } from '../services/socket/onConnection';
import { onJoin } from '../services/socket/onJoin';

const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors: {
        origin: 'http://localhost:3001',
        
    }
};

const io = new Server(socketConfig);

io.use(auth);

io.on('connection', onConnection);
io.on('create_room', onJoin);

export { io };
