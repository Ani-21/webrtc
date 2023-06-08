import { Socket } from "socket.io";
import { io } from "../../config/socket";
import {
    SocketUserEvent,
    SocketUserError,
    SocketRoom,
} from "../../const/user/socketEvents";
import { SocketMessageEvent } from "../../const/messages/socketEvent";
import { MAX_LENGTH } from "../../const/user/constants";
import { AppState } from "../../state";

interface IUser {
    name: string;
    userId: string;
}

interface IData {
    userData: IUser;
    error: string;
}

interface ValidData {
    name: string;
}

export const loginService = async (socket: Socket, res: ValidData) => {
    const { name } = res;

    const data: IData = {
        userData: {
            name,
            userId: socket.id,
        },
        error: "",
    };

    const usersInRoom = AppState.getUsers().length;
    let { userData } = data;

    console.log(userData);

    if (usersInRoom === MAX_LENGTH) {
        data.error = SocketUserError.fullRoomError;
        io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
    } else {
        if (name.length) {
            userData.name = name;
            const messages = AppState.getMessages();
            AppState.addNewUser({ id: userData.userId, name });
            io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
            console.log("MESSSAGES", messages);
            socket.join(SocketRoom.room);
            io.to(userData.userId).emit(
                SocketMessageEvent.getMessages,
                messages
            );
        } else {
            data.error = SocketUserError.invalidNameError;
            io.to(userData.userId).emit(SocketUserEvent.validateEnter, data);
        }
    }
};
