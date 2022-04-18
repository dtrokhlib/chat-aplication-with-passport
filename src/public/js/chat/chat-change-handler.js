const chatList = document.getElementsByClassName('chat-list-item');
let currentChatId = '';

const addChatsListeners = () => {
  for (let i = 0; i < chatList.length; i++) {
    chatList[i].addEventListener('click', async (e) => {
      currentChatId = e.currentTarget.id;
      socket.emit('room:change', currentChatId);
    });
  }
};

setTimeout(addChatsListeners, 500);
