const messageService = require('./message-service');

module.exports = function (io) {

  let usernames = [];

  io.on('connection', socket => {

    socket.on('new user', (data, callback) => {
      if (usernames.indexOf(data) != -1 || data == "") {
        callback(false);
      } else {
        callback(true);
        socket.username = data;
        usernames.push(socket.username);
        updateUsernames();
        updateChat();
        console.log('Nuevo usuario conectado: ' + socket.username);
      }
    })

    socket.on('send message', data => {
      io.sockets.emit('new message', {
        msg: data,
        username: socket.username
      });
      insertChat(socket.username, data);

    });


    socket.on('disconnect', (data) => {
      if (!socket.username) return;
      usernames.splice(usernames.indexOf(socket.username), 1)
      updateUsernames();
    });

    socket.on('delete_messages', () => {
      deleteChat();
      setTimeout(() => {
        updateChat();
      }, 500)

    })

    function updateUsernames() {
      io.sockets.emit('usernames', usernames);
    }

    function updateChat() {
      // Actualizo el chat
      messageService.refreshChat(io);
    }

    function insertChat(username, msg) {
      messageService.insertChat(username, msg);
    }

    function deleteChat() {
      messageService.deleteChat();
    }
  });
}