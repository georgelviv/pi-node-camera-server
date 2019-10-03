const {socketLog} = require('./log');

const socketListener = (socket) => {
  const log = socketLog(socket.id);
  log('user connected to socket');
};

module.exports = {
  socketListener
};
