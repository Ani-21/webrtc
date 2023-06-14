import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { loginService } from "../../../services/socket/loginService";
import { logoutService } from "../../../services/socket/logoutService";

interface ValidData {
    name: string;
}

export const login: IRouteFn = async (socket: Socket, res: ValidData) => {
    const result = await loginService(socket, res);
    return result;
};

export const logout: IRouteFn = async (socket: Socket, res: any) => {
    const result = await logoutService(socket, res);
    return result;
};
