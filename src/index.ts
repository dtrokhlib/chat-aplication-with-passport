import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import { Application } from './app';
import http from 'http';
import { messageReceived } from './event-handlers/message-event-handler';

const PORT = process.env.PORT || 3000;

const app = new Application().bootstrap();
const server = http.createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`chat-app-with-passport is running on ${PORT}`);
});

const onConnection = (socket: Socket) => {
  console.log('Connection to WebSocket received');
  socket.emit('message', 'Welcome to the chat!');

  socket.on('message:received', messageReceived);
};

io.on('connection', onConnection);
