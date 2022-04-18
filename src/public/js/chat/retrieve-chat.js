const roomContainer = document.querySelector('.room-container');

document.addEventListener('DOMContentLoaded', async () => {
  const request = await fetch('/chats');
  const response = await request.json();
  localStorage.setItem('userId', response.user);
  insertChats(response.chats);
  socket.emit('room:join-all', {
    chats: response.chats,
    userId: localStorage.getItem('userId'),
  });
});

const insertChats = (chats) => {
  let innerBody = '';

  chats.forEach((chat) => {
    innerBody += `<div class="chat-list-item row" id="${chat._id}"><div class="col"><h5>${chat.name}</h5>
    <span>${chat.type}</span></div></div>`;
  });

  roomContainer.innerHTML = innerBody;
};