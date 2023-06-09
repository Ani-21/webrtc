import { Socket } from "socket.io";
import { AppState } from "../../state";
import { IMessage } from "../../const/messages/models";
import { SocketRoom } from "../../const/user/socketEvents";
import { SocketMessageEvent } from "../../const/messages/socketEvent";
import { io } from "../../config/socket";
import { io } from "../../config/socket";

export const messageService = async (socket: Socket, newMessage: IMessage) => {
    AppState.addNewMessage(newMessage);
    io.to(SocketRoom.room).emit(SocketMessageEvent.recieveMessage, newMessage);
};
