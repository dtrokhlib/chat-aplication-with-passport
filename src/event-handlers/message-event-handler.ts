export const registerMessageHandler = (io: any, socket: any) => {
  const recieveMessage = async (payload: any) => {
    io.to(payload.room).emit('message:send', { message: payload.value });
  };

  const sendMessage = (payload: any) => {
    console.log(payload);
  };

  const roomChange = async (payload: any) => {
    io.to(payload).emit('room:current', { info: `Room: ${payload}` });
  };

  const roomJoinAll = async (payload: any) => {
    const { chats } = payload;
    chats.forEach((chat: any) => {
      socket.join(chat._id);
    });
  };

  socket.on('message:send', recieveMessage);
  socket.on('message:receive', sendMessage);
  socket.on('room:change', roomChange);
  socket.on('room:join-all', roomJoinAll);
};
