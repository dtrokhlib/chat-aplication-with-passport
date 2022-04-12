const socket = io();
const sendMessage = document.querySelector("#send-message");
const messageValue = document.querySelector("#message-value");

socket.on("message", (message) => {

});

sendMessage.addEventListener("click", (e) => {
  e.preventDefault();

  const data = {
    user: "User 1",
    room: "Test",
    value: messageValue.value,
    time: new Date(),
  };
  socket.emit("message:send", data);
});
