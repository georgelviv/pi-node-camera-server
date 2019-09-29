const {ee} = require('src/utils');
const {socketLog} = require('./log');

const socketListener = (socket) => {
  const log = socketLog(socket.id);
  log('user connected to socket');

  ee.on('img', (img) => {
    socket.emit('image', img.toString('base64'));
  });
};

module.exports = {
  socketListener
};
