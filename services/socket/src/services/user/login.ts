import { Socket } from 'socket.io';

import { io } from '../../config/socket'

interface IArgs {
    name: string;
}

export const login = async ({name} : IArgs) => {
    if(name) {
        io.emit('join', (socket: Socket) => {
            console.log(`${socket.id} joined room`)
        })
    }
}