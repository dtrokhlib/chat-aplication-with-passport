const messageContainer = document.querySelector('.message-cotainer');

const insertMesssageBlock = (messages) => {
  messages.forEach((message) => {
    const div = document.createElement('div');
    div.classList.add('row');
    div.classList.add('message1');
    div.setAttribute('id', message._id);

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('col');
    innerDiv.innerHTML = `<span style="text-decoration: underline;">${
      message.userId.firstName
    } ${message.userId.lastName}</span>
  <span style="float: right;">${moment(message.date).format(
    'h:mm MMMM YYYY'
  )}</span><br /><span>${message.message}</span>`;

    div.appendChild(innerDiv);
    messageContainer.appendChild(div);
  });
};
