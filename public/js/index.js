var socket = io();
var user = Math.floor(Math.random()*1000);


socket.on('connect',()=>{
  console.log('connected');
  socket.emit('user',{user})
});

const chatBox =document.querySelector('ul');
const btn = document.querySelector('button');
const input = document.querySelector('input');

input.focus();

socket.on('disconnect', ()=>{
  console.log('disconnected');
  socket.emit({user})
});

socket.on('newMessage', function (e) {
  if(e.user===user){
    chatBox.insertAdjacentHTML('beforeend', `<li style="background: #abc">user${e.user}: ${e.message}</li>`)
  }else{
    chatBox.insertAdjacentHTML('beforeend', `<li style="">user${e.user}: ${e.message}</li>`)
  }
  chatBox.scrollTop=chatBox.scrollHeight;
});

socket.on('userList', function (e) {
  chatBox.insertAdjacentHTML('beforeend', `<li style="font-size: 14px">user${e.user} has connected</li>`)
});

socket.on('dcUser', function (e) {
  chatBox.insertAdjacentHTML('beforeend', `<li style="font-size: 14px">${e}</li>`)
});





function sendMessage() {
  socket.emit('createMessage', {user, message:input.value});
  input.value='';
  input.focus();
  chatBox.scrollTop=chatBox.scrollHeight;
}

btn.addEventListener('click', sendMessage);
input.addEventListener('keydown', function (e) {
  if(e.keyCode===13) sendMessage()
});



