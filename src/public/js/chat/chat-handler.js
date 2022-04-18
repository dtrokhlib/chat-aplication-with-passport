const openCreateChatPopup = document.querySelector('#create-chat-btn');
const createChatPopup = document.querySelector('.create-chat-popup');
const createChat = document.querySelector('#createChat');
const chatNameInput = document.querySelector('#chatName');
const chatTypeInput = document.querySelector('#chatType');

openCreateChatPopup.addEventListener('click', (e) => {
  e.preventDefault();

  createChatPopup.style.display = 'block';
});

createChat.addEventListener('click', async (e) => {
  e.preventDefault();

  if(!chatNameInput.value || chatNameInput.length < 2) {
    return alert('Name must be longer than 2 elements');
  }

  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: chatNameInput.value,
      chatType: chatTypeInput.options[chatTypeInput.selectedIndex].value,
    }),
  });

  const parsedResponse = await response.json();
  chatNameInput.value = '';
  createChatPopup.style.display = 'none';
});
