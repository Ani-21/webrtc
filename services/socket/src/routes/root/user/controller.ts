import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { io } from "../../../config/socket";
import { UserEvents } from "../../../const/user/events";

interface IUser {
    id: string;
    name: string;
}
const users: IUser[] = [];

export const login: IRouteFn = async (socket: Socket, name: string) => {
    if (users.length === 4) {
        io.emit(UserEvents.full, true);
    } else {
        users.push({ id: socket.id, name });
    }
};
