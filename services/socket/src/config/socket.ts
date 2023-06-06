import dotenv from "dotenv";
import { Server } from "socket.io";
import { auth } from "../services/socket/auth";
import { onConnection } from "../services/socket/onConnection";

dotenv.config();

const origin = process.env.ALLOWED_ORIGIN;

const socketConfig = {
    pingInterval: 10000,
    pingTimeout: 10000,
    cors: {
        origin,
    },
};

const io = new Server(socketConfig);

io.use(auth);

io.on("connection", onConnection);

export { io };
