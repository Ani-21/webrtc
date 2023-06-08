import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { AppState } from "../../state";
import { IMessage } from "../../const/messages/models";
import { SocketRoom } from "../../const/user/socketEvents";
import { SocketMessageEvent } from "../../const/messages/socketEvent";

export const messageService = async (socket: Socket, newMessage: IMessage) => {
    console.log("NEW MSG", newMessage);
    AppState.addNewMessage({ ...newMessage, id: uuidv4() });
    socket
        .to(SocketRoom.room)
        .emit(SocketMessageEvent.recieveMessage, newMessage);
};
