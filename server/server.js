const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));



io.on('connection', function (socket) {

  console.log('New user connected');

  socket.on('user', function (e) {
    console.log(`user ${e.user} has connected`);
    io.emit('userList', {user:e.user})
  });

  socket.on('disconnect', function (e) {
    console.log('User disconected from the server');
    io.emit('dcUsers', 'user has disconnected')
  });



  socket.on('createMessage', (m) => {
    console.log('message', m);
    io.emit('newMessage', {
      user: m.user,
      message: m.message,
      createdAt: new Date().getTime()
    });
    console.log('----')
  })

});


server.listen(port, () => {
  console.log(`listening on port ${3000}`)
});