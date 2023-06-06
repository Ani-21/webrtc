import { Socket } from "socket.io";
import { io } from "../../config/socket";
import { SocketEvent, SocketError } from "../../const/user/socketEvents";
import { MAX_LENGTH } from "../../const/user/constants";
import { AppState } from "../../state";

interface IData {
    name: string;
    error: string;
}

interface ValidData {
    name: string;
}

export const loginService = async (socket: Socket, res: ValidData) => {
    const { name } = res;

    const data: IData = {
        name,
        error: "",
    };

    const usersInRoom = AppState.getUsers().length;

    if (usersInRoom === MAX_LENGTH) {
        data.error = SocketError.fullRoomError;
        io.to(socket.id).emit(SocketEvent.validateEnter, data);
    } else {
        console.log(name.length);
        if (name.length) {
            data.name = name;
            AppState.addNewUser({ id: socket.id, name });
            io.to(socket.id).emit(SocketEvent.validateEnter, data);
        } else {
            data.error = SocketError.invalidNameError;
            io.to(socket.id).emit(SocketEvent.validateEnter, data);
        }
    }
};
