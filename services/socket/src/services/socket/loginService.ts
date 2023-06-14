import { Socket } from "socket.io";
import { AccessToken } from "livekit-server-sdk";
import { io } from "../../config/socket";
import {
    SocketUserEvent,
    SocketUserError,
    SocketRoom,
} from "../../const/user/socketEvents";
import { MAX_LENGTH } from "../../const/user/constants";
import { AppState } from "../../state";
import { IMessage } from "../../const/messages/models";
import { vars } from "../../config/vars";

interface IUser {
    name: string;
    userId: string;
    token: string;
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

    const at = new AccessToken(vars.apiKey, vars.apiSecret, {
        identity: socket.id,
        name,
    });

    at.addGrant({
        roomJoin: true,
        room: SocketRoom.room,
        canPublish: true,
        canSubscribe: true,
    });

    const data: IData = {
        messages: AppState.getMessages(),
        userData: {
            name,
            userId: socket.id,
            token: at.toJwt(),
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
