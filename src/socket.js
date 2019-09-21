const socketIo = require('socket.io');

const initSocket = (server) => {
  const io = socketIo(server);

  setInterval(() => {
    io.emit('image', 'data')
  }, 1000);
};

module.exports = {
  initSocket
};
