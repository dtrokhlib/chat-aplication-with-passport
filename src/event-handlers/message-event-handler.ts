import { Chat } from '../models/chat.';
import { Message } from '../models/message';

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
    const { room } = payload;
    const messages = await Message.find({
      chatId: room,
    }).populate('userId');
    socket.join(room);
    io.to(room).emit('room:current', { messages });
  };

  const roomJoinAll = async (payload: any) => {
    // const { chats } = payload;
    // chats.forEach((chat: any) => {
    //   socket.join(chat._id);
    // });
  };

  const roomJoin = async (payload: any) => {
    const { room, userId } = payload;
    const chat = await Chat.findById(room);
    chat!.participants.push({
      userId,
      role: 1,
    });

    await chat!.save();

    socket.emit('room:join');
  };

  const roomLeave = async (payload: any) => {
    const { room } = payload;
    socket.leave(payload);
  };

  const searchChat = async (payload: any) => {
    const { id, searchValue } = payload;
    const chats = await Chat.find({
      'participants.userId': { $ne: id },
      type: 0,
      name: { $regex: '.*' + searchValue + '.*' },
    });

    socket.emit('room:search', chats);
  };

  socket.on('message:send', recieveMessage);
  socket.on('message:receive', sendMessage);
  socket.on('room:change', roomChange);
  socket.on('room:join-all', roomJoinAll);
  socket.on('room:join', roomJoin);
  socket.on('room:search', searchChat);
  socket.on('room:leave', roomLeave);
};
