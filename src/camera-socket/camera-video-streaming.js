const {ee, GLOBAL_EVENTS} = require('src/utils');

const cameraVideoStreaming = (socket) => {
  socket.on('data', (msg) => {
    ee.emit(GLOBAL_EVENTS.cameraMpeg, msg);
  });
};

module.exports = {
  cameraVideoStreaming
};
