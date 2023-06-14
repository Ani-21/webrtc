import { Socket } from "socket.io";
import { AppState } from "../../state";
import { SocketRoom, SocketUserEvent } from "../../const/user/socketEvents";
import { io } from "../../config/socket";

interface IUser {
    id: string;
    isLoggedIn: boolean;
}

export const logoutService = async (socket: Socket, user: IUser) => {
    AppState.logoutUser(user.id);
    if (user.isLoggedIn) user.isLoggedIn = false;
    io.to(SocketRoom.room).emit(SocketUserEvent.logout, user.isLoggedIn);
};
