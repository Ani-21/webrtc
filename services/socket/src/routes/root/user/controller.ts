import { IRouteFn } from "../../../../types/socket";
import { Socket } from "socket.io";
import { loginService } from "../../../services/socket/loginService";

interface ValidData {
    name: string;
}

export const login: IRouteFn = async (socket: Socket, res: ValidData) => {
    const result = await loginService(socket, res);
    return result;
};
