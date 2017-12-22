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

io.on('connection', function(socket){

  console.log('New user connected');

  socket.on('disconnect', function(){
    console.log('User disconected from the server')
  });

  socket.emit('newMessage', {
    from:'wicked@troll.org',
    text:'whats up mon???!',
    createdAt:2017
  });

  socket.on('createEmail', (e)=>{
    console.log(e)
  });

  socket.on('createMessage', (m)=>{
    console.log('message',m)
  })

});



server.listen(port, ()=>{
  console.log(`listening on port ${3000}`)
});