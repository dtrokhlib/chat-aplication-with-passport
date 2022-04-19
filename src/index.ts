import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import { Application } from './app';
import http from 'http';
import { registerMessageHandler } from './event-handlers/message-event-handler';
import mongoose from 'mongoose';
import './middlewares/passport-strategies';

const PORT = process.env.PORT || 3000;

const startUp = async () => {
  const app = new Application().bootstrap();
  const server = http.createServer(app);
  const io = new Server(server);

  await mongoose.connect(process.env.MONGO_DB_URL!);
  console.log('Connected to Database');

  server.listen(PORT, () => {
    console.log(`chat-app-with-passport is running on ${PORT}`);
  });

  const onConnection = async (socket: Socket) => {
    socket.emit('message', 'Welcome to the chat!');
    registerMessageHandler(io, socket);
  };

  io.on('connection', onConnection);
};

startUp();
