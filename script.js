document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.querySelector("#username");
  const enterChatButton = document.querySelector("#enter-chat");
  const chatWindow = document.querySelector(".chat-window");
  const messagesContainer = document.querySelector(".chat-messages");
  const messageInput = document.querySelector("#message");
  const sendMessageButton = document.querySelector("#send-message");


  let username;

  enterChatButton.addEventListener("click", function () {
    username = usernameInput.value;

    if (!username) {
      alert("Please enter a username");
      return;
    }

    document.querySelector(".username-container").style.display = "none";
    document.querySelector(".chat-window").style.display = "block";
    socket.emit("setUsername", username);
  });

  usernameInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      enterChatButton.click();
    }
  });

  sendMessageButton.addEventListener("click", function () {
    const message = messageInput.value;

    if (!message) {
      alert("Please enter a message");
      return;
    }
    console.log("chatmessage: " + message);
    socket.emit('chatmessage', message);
    messageInput.value = "";
  });

  messageInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      sendMessageButton.click();
    }
  });
});
