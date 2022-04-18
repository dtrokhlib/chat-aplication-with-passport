const chatSearchList = document.querySelector('.chat-search-list');

const insertChatSearch = (chats) => {
  let html = '';

  chats.forEach((chat) => {
    html += `<div class="chat-item">Chat name: <strong>${chat.name}</strong><br><button id="${chat._id}" class="join-button btn btn-primary">Join</button></div>`;
  });

  chatSearchList.innerHTML = html;
};
