import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { messageService } from "../../../services/socket/messageService";
import { IMessage } from "../../../const/messages/models";

export const sendMessage: IRouteFn = async (socket: Socket, msg: IMessage) => {
    const result = await messageService(socket, msg);
    return result;
};
