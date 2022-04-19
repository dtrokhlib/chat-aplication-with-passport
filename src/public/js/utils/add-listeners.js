const addChatsListeners = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', async (e) => {
      await socket.emit('room:leave', { room: localStorage.getItem('room') });
      await localStorage.setItem('room', e.currentTarget.id);
      document.querySelector('.text-message').style.display = 'block';
      socket.emit('room:change', { room: localStorage.getItem('room') });
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
