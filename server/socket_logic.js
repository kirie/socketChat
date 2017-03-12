const users = require('./users');

module.exports = function (socket) {
  const name = users.registerGuest();

  socket.emit('initialSetup', {
    name,
    users: users.getUsers()
  });

  socket.broadcast.emit('userJoin', { name });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingNotify', {
      user: data.name,
      typing: data.typing
    });
  });

  socket.on('incoming', (data) => {
    socket.broadcast.emit('incoming', {
      user: name,
      text: data.text
    });
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('userLeft', { name });
    users.vacate(name);
  });
};
