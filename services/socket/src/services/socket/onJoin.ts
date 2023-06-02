import { Socket } from 'socket.io';
import { rootRouter } from '../../routes';
import { logger } from '../../config/logger';

export const onJoin = (socket: Socket) => {
    rootRouter.subscribe(socket);
    socket.on('create_room', (room) => {
        socket.join(room)
        logger.info(`user:joined:room:${room}`)
    })
}



// socket.on('connection', (socket) => {
// socket.on('join_room', (room) => {
// socket.join(room)
// })
// })