const socket = io();
const sendMessage = document.querySelector('#send-message');
const messageValue = document.querySelector('#message-value');

sendMessage.addEventListener('click', (e) => {
  e.preventDefault();

  const data = {
    room: currentChatId,
    value: messageValue.value,
  };
  socket.emit('message:send', data);
});

socket.on('room:current', (data) => {
  console.log(data.info);
});

socket.on('message:send', (msg) => {
  console.log(msg);
});
