import { Server } from "socket.io";

export let io: Server;

export const handleSocket = (_io: Server) => {
    io = _io;

    io.on("connection", async (socket) => {
        console.log("io connected")
    })
}