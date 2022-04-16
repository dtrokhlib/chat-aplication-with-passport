export const registerMessageHandler = (io: any, socket: any) => {
  const recieveMessage = async (payload: any) => {
    console.log(payload);
  };

  const sendMessage = (payload: any) => {
    console.log(payload);
  };

  const roomChange = async (payload: any) => {
    await socket.join(payload);
    io.to(payload).emit('roomJoined', { info: `Room: ${payload}` });
  };

  socket.on('message:send', recieveMessage);
  socket.on('message:receive', sendMessage);
  socket.on('room:change', roomChange);
};
