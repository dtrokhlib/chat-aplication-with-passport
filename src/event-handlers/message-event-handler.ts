import moment from 'moment';
import mongoose from 'mongoose';
import { Message } from '../models/message';
import { User } from '../models/user';

export const registerMessageHandler = (io: any, socket: any) => {
  const recieveMessage = async (payload: any) => {
    const { room: chatId, value, userId } = payload;
    const message = Message.build({
      chatId,
      userId,
      message: value,
      date: new Date(),
      isDeleted: false,
    });
    await message.save();
    await message.populate('userId');
    io.to(chatId).emit('message:send', {
      message,
    });
  };

  const sendMessage = (payload: any) => {
    console.log(payload);
  };

  const roomChange = async (payload: any) => {
    const messages = await Message.find({
      chatId: payload,
    }).populate('userId');
    io.to(payload).emit('room:current', { messages });
  };

  const roomJoinAll = async (payload: any) => {
    const { chats } = payload;
    chats.forEach((chat: any) => {
      socket.join(chat._id);
      console.log(`Chat joined: ${chat._id} - ${chat.name}`);
    });
  };

  socket.on('message:send', recieveMessage);
  socket.on('message:receive', sendMessage);
  socket.on('room:change', roomChange);
  socket.on('room:join-all', roomJoinAll);
};
