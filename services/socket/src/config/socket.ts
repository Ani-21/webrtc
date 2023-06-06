import { Server } from "socket.io";
import { auth } from "../services/socket/auth";
import { onConnection } from "../services/socket/onConnection";
import { vars } from "./vars";

const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors: {
        origin: vars.origin,
    },
};

const io = new Server(socketConfig);

io.use(auth);

io.on("connection", onConnection);

export { io };
