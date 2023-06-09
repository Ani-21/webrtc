import { Socket } from "socket.io";
import { io } from "../../config/socket";
import {
    SocketUserEvent,
    SocketUserError,
    SocketRoom,
} from "../../const/user/socketEvents";
import { MAX_LENGTH } from "../../const/user/constants";
import { AppState } from "../../state";
import { IMessage } from "../../const/messages/models";

interface IUser {
    name: string;
    userId: string;
}

interface IData {
    messages: IMessage[];
    userData: IUser;
    error: string;
}

interface ValidData {
    name: string;
}

export const loginService = async (socket: Socket, res: ValidData) => {
    const { name } = res;

    const data: IData = {
        messages: AppState.getMessages(),
        userData: {
            name,
            userId: socket.id,
        },
        error: "",
    };

    const usersInRoom = AppState.getUsers().length;
    let { userData } = data;

    if (usersInRoom === MAX_LENGTH) {
        data.error = SocketUserError.fullRoomError;
        io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
    } else {
        if (name.length) {
            userData.name = name;
            AppState.addNewUser({ id: userData.userId, name });
            socket.join(SocketRoom.room);
            io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
        } else {
            data.error = SocketUserError.invalidNameError;
            io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
        }
    }
};
