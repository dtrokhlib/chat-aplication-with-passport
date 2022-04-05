import "dotenv/config";
import { Server } from "socket.io";
import { Application } from "./app";
import http from "http";

const PORT = process.env.PORT || 3000;

const app = new Application().bootstrap();
const server = http.createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`chat-app-with-passport is running on ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});
