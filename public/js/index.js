var socket = io();
socket.on('connect',()=>{
  console.log('connected');
  socket.emit('createMessage',{
    to:'Orgrimmar',
    message:'Interested in rendting a house-!'
  })
});

socket.on('disconnect', ()=>{
  console.log('disconnected')
});

socket.on('newMessage', function (e) {
  console.log(e);
  var h = document.querySelector('h2');
  h.textContent=e.text;
});