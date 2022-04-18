const addChatsListeners = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', async (e) => {
      localStorage.setItem('room', e.currentTarget.id);
      socket.emit('room:change', localStorage.getItem('room'));
    });
  }
};

const addChatsSearchListeners = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', async (e) => {
      socket.emit('room:join', {
        userId: localStorage.getItem('userId'),
        room: e.currentTarget.id,
      });
    });
  }
};
