const socketIo = require('socket.io');
const {ee, GLOBAL_EVENTS} = require('src/utils');
const {socketListener} = require('./socket-listener');

const initSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', socketListener);

  ee.on('img', (img) => {
    io.emit('image', img.toString('base64'));
  });

  ee.on(GLOBAL_EVENTS.cameraMpeg, (mpeg) => {
    io.emit('mpeg', mpeg);
  });

  // ee.on(GLOBAL_EVENTS.cameraOn);
};

module.exports = {
  initSocket
};
