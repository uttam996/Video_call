// var app = require(‘express’ )();
// var http = require( ‘http’ ).createServer( app );
// var io = require( ‘socket.io’ )( http );

// const PORT = 3000;

// app.get( ‘/’, function( req, res ) {
// res.sendFile( __dirname + ‘/public/index.html’ );
// });

// http.listen( PORT, function() {
// console.log( ‘listening on *:’ + PORT );
// });

// io.on( ‘connection’, function( socket ) {
// console.log( “a user has connected!” );
// });

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const morgan = require("morgan");
const UserRouter = require("./Routes/user.route");
const cors = require("cors");
const connectDb = require("./db/db.config");

const io = new Server(http, {
  cors: {
    origin: "*",
  },
});

const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
app.use("/api/user", UserRouter);

const OnlineUsers = {};

http.listen(PORT, function () {
  console.log("listening on *:" + PORT);
});

connectDb();

io.on("connection", (socket) => {
  let userId = socket.handshake.query.userId;

  if (!userId) {
    socket.disconnect();
  }

  OnlineUsers[userId] = socket.id;
  io.emit("onlineUsers", OnlineUsers);
  console.log(OnlineUsers);

  socket.on("call", (data) => {
    console.log(data);
    io.to(OnlineUsers[data.to]).emit("incomingCall", {
      from: data.from,
      callerId: data.callerId,
      peer: data.peerId,
    });
    console.log(data);
  });

  socket.on("callAccepted", (data) => {
    io.to(OnlineUsers[data.callerId]).emit("callAccepted", data);
    console.log(data);
    
  });
  socket.on("callDeclined", (data) => {
    console.log(data);
    io.to(OnlineUsers[data.callerId]).emit("callDeclined", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete OnlineUsers[userId];
    io.emit("onlineUsers", OnlineUsers);
  });



  console.log("a user has connected!");
});
