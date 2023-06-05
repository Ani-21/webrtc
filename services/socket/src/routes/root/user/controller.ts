import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { loginService } from "../../../services/socket/loginService";

export const login: IRouteFn = async (socket: Socket, name: string) => {
    const result = await loginService(socket, name);
    return result;
};
