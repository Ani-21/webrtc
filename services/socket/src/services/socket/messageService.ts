import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { SocketEvent } from "../../const/messages/socketEvent";
import { AppState } from "../../state";
import { IMessage } from "../../const/messages/models";

export const messageService = async (socket: Socket, newMessage: IMessage) => {
    const messages = AppState.getMessages();
    AppState.addNewMessage({ ...newMessage, id: uuidv4() });
    socket.broadcast.emit(SocketEvent.recieveMessage, messages);
};
