const users = require('./users');

module.exports = function (socket) {
  let name = users.registerGuest();

  socket.emit('initialSetup', {
    name,
    users: users.getUsers()
  });

  socket.broadcast.emit('userJoin', { name });

  socket.on('namechange', (data) => {
    if (users.registerUser(data.name)) {
      const formerName = name;
      users.vacate(formerName);
      name = data.name;
      const nameMsg = {
        formerName,
        name
      };
      socket.emit('changedName', nameMsg);
      socket.broadcast.emit('changedName', nameMsg);
    }
  });

  socket.on('message', (data) => {
    const newMsg = {
      time: data.time,
      user: data.name,
      text: data.text
    };
    socket.emit('incoming', newMsg);
    socket.broadcast.emit('incoming', newMsg);
  });

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

  socket.on('disconnect', () => {
    socket.broadcast.emit('userLeft', { name });
    users.vacate(name);
  });
};
