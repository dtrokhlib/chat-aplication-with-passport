export const registerMessageHandler = (io: any, socket: any) => {
  const sendMessage = (payload: any) => {
    console.log(payload);
  };

  const receiveMesage = (payload: any) => {
    console.log(payload);
  };

  socket.on("message:send", sendMessage);
  socket.on("message:receive", receiveMesage);
};
