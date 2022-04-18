const chatSearchButton = document.querySelector('#search-chat-btn');
const cancelSearchChat = document.querySelector('#cancelSearchChat');
const searchChat = document.querySelector('#searchChat');
const chatSearchPopup = document.querySelector('.search-chat-popup');
const searchChatInput = document.querySelector('#search-chat-input');

chatSearchButton.addEventListener('click', (e) => {
  e.preventDefault();
  chatSearchPopup.style.display = 'block';
});

cancelSearchChat.addEventListener('click', (e) => {
  e.preventDefault();
  chatSearchPopup.style.display = 'none';
});

searchChat.addEventListener('click', (e) => {
  socket.emit('room:search', {
    id: localStorage.getItem('userId'),
    searchValue: searchChatInput.value,
  });
});
