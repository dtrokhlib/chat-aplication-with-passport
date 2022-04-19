const insertChats = (chats) => {
  let innerBody = '';

  chats.forEach((chat) => {
    innerBody += `<div class="chat-list-item row" id="${chat._id}"><div class="col"><h5>${chat.name}</h5>
    <span>Participants ${chat.participants.length}</span></div></div>`;
  });

  roomContainer.innerHTML = innerBody;
};
