const socketIo = require('socket.io');
const {socketListener} = require('./socket-listener');

const initSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', socketListener);
};

module.exports = {
  initSocket
};
