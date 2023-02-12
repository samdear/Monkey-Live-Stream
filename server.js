var express = require("express");
var app = express();

app.use(express.static("public"));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

var http = require("http");
// var socketIo = require("socket.io");
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 80;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const { Server } = require('socket.io');
const io = new Server(httpServer, {});

// const io = socketIo(server);

const connectedUsers = {};

const automatedResponses = [
  "Hey there!",
  "How's it going?",
  "What's on your mind?",
  "I'm here to chat!",
  "What's new?",
  "How can I help you today?",
  "Is there anything you want to talk about?"
];

io.sockets.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("setUsername", (username) => {
    connectedUsers[socket.id] = username;
    socket.emit("userSet", { username });
  });

  socket.on("chatmessage", (message) => {
    io.emit("chatmessage", {
      message,
      username: connectedUsers[socket.id],
    });

    // Automated response from Monkey
    setTimeout(function () {
      const randomResponseIndex = Math.floor(Math.random() * automatedResponses.length);
      const message = automatedResponses[randomResponseIndex];
      io.emit("chatmessage", {
        message,
        username: "Monkey"
      })
    }, 700); // .7 second delay
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete connectedUsers[socket.id];
  });
});

