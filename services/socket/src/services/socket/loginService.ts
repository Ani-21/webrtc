import { Socket } from "socket.io";
import { io } from "../../config/socket";
import { Event } from "../../const/user/events";
import { logger } from "../../config/logger";
import { Errors, MAX_LENGTH } from "../../const/user/constants";
import state from "../../state";

interface IData {
    name: string;
    error: string;
}
const data: IData = {
    name: "",
    error: "",
};

export const loginService = async (socket: Socket, name: string) => {
    const usersInRoom = state.getUsers().length;

    if (usersInRoom === MAX_LENGTH) {
        io.to(socket.id).emit(
            Event.validateEnter,
            (data.error = Errors.fullRoomError)
        );
        logger.info("Room is full");
    } else {
        if (name.length !== 0) {
            data.name = name;
            state.addNewUser({ id: socket.id, name });
            io.to(socket.id).emit(Event.validateEnter, data.name);
            logger.info(`User ${name} joined: users in room: ${usersInRoom}`);
        } else {
            io.to(socket.id).emit(
                Event.validateEnter,
                (data.error = Errors.invalidNameError)
            );
            logger.info("INVALID NAME");
        }
    }
};
