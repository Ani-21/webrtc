import { Socket } from "socket.io";
import { AppState } from "../../state";
import { SocketRoom, SocketUserEvent } from "../../const/user/socketEvents";
import { io } from "../../config/socket";

export const logoutService = async (socket: Socket, userId: string) => {
    AppState.logoutUser(userId);
    io.to(SocketRoom.room).emit(SocketUserEvent.logout, userId);
};
