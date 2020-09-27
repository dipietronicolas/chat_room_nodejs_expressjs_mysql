window.onload = function wtd() {

  const socket = io();

  const message_form = document.getElementById('message-form');
  const message_box = document.getElementById('message');
  const chat = document.getElementById('chat');

  const login_form = document.getElementById('login-form');
  const username = document.getElementById('username');
  const chat_username = document.getElementById('chat-username');
  const username_error = document.getElementById('username-error');

  const login = document.getElementById('login');
  const chat_room = document.getElementById('chat-room');
  const users = document.getElementById('users');

  // DELETE button
  const delete_button = document.querySelector('#delete_button');

  chat_room.style.display = "none";
  username_error.style.display = "none";
  chat_username.style.display = "none";

  login_form.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('new user', username.value, data => {
      if (data) {
        login.style.display = "none";
        chat_room.style.display = "";
        chat_username.textContent = username.value;
        chat_username.style.display = "";
        message_box.focus();
      } else {
        username_error.style.display = "";
      }
    });
  });

  // DELETE button
  delete_button.addEventListener('click', e => {
    //e.preventDefault();
    socket.emit('delete_messages', () =>{
    })
  })

  // Hola esto es un comentario.
  message_form.addEventListener('submit', e => {
    e.preventDefault();
    if (message_box.value != '') {
      socket.emit('send message', message_box.value);
      message_box.value = '';
    }
  });

  socket.on('new message', function (data) {
    chat.innerHTML += '<b>' + data.username + '</b>: ' + data.msg + '<br/>';
  });

  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += '<i class="fas fa-user mt-1"/>&nbsp;' + data[i] + '<br/>'
    }
    users.innerHTML = html;
  });

  socket.on('chats', data => {
    $('#chat').html('');
    for (let chat of data) {
      $('#chat').append(`
          <b>${chat.username}</b>: ${chat.chat}<br/>
      `)
    }
  })
}