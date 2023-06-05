import { Socket } from "socket.io";
import { io } from "../../config/socket";
import { SocketEvents } from "../../const/user/events";
import { Errors, MAX_LENGTH } from "../../const/user/constants";
import { AppState } from "../../state";

interface IData {
    name: string;
    error: string;
}

export const loginService = async (socket: Socket, name: string) => {
    const data: IData = {
        name: "",
        error: "",
    };

    const usersInRoom = AppState.getUsers().length;

    if (usersInRoom === MAX_LENGTH) {
        data.error = Errors.fullRoomError;
        io.to(socket.id).emit(SocketEvents.validateEnter, data);
    } else {
        if (!name.length) {
            data.name = name;
            AppState.addNewUser({ id: socket.id, name });
            io.to(socket.id).emit(SocketEvents.validateEnter, data);
        } else {
            data.error = Errors.invalidNameError;
            io.to(socket.id).emit(SocketEvents.validateEnter, data);
            console.log("INVALID NAME");
        }
    }
};
