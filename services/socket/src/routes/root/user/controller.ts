import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { io } from "../../../config/socket";
import { UserEvents } from "../../../const/user/events";
import { logger } from "../../../config/logger";

interface IUser {
    id: string;
    name: string;
}
const users: IUser[] = [];

export const login: IRouteFn = async (socket: Socket, name: string) => {
    if (users.length === 4) {
        io.emit(UserEvents.isFull, true);
        logger.info("Room is full");
    } else {
        if (name.length !== 0) {
            users.push({ id: socket.id, name });
            io.emit(UserEvents.validateUsername, true);
            logger.info(`User ${name} joined: users in room: ${users.length}`);
        }
        io.emit(UserEvents.validateUsername, false);
        logger.info("INVALID NAME");
    }
};
