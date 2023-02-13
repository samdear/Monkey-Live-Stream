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
"How's your day?",
"What are you grateful for?",
"What do you do for fun?",
"What will people say about you at your funeral?",
"Any happiest moments of the year?",
"Where did you grow up?",
"Are you proud of me?",
"Did you enjoy school?",
"What kind of student were you?",
"What would you do for fun?",
"How would your classmates remember you?",
"What makes you happy?",
"What do you most enjoy doing?"
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

