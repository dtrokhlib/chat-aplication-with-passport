const socket = io();
const sendMessage = document.querySelector('#send-message');
const messageValue = document.querySelector('#message-value');

sendMessage.addEventListener('click', (e) => {
  e.preventDefault();

  const data = {
    room: currentChatId,
    value: messageValue.value,
    userId: localStorage.getItem('userId'),
  };
  messageValue.value = '';
  messageValue.focus();
  socket.emit('message:send', data);
});

socket.on('room:current', ({ messages }) => {
  messageContainer.innerHTML = '';
  insertMesssageBlock(messages);
});

socket.on('message:send', ({ message }) => {
  insertMesssageBlock([message]);
});

socket.on('room:search', (chats) => {
  insertChatSearch(chats);
});
