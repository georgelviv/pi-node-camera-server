const {ee, GLOBAL_EVENTS} = require('src/utils');
const {socketLog} = require('./log');
const {cameraContinuesCapture} = require('./camera-continues-capture');
const {cameraVideoStreaming} = require('./camera-video-streaming');

const socketListener = (isVideoStream) => (socket) => {
  const {address} = socket.address();
  const log = socketLog(address.slice(-3));

  if (isVideoStream) {
    cameraVideoStreaming(socket);
  } else {
    cameraContinuesCapture(socket);
  }

  log('camera connected');
  ee.emit(GLOBAL_EVENTS.cameraOn);

  socket.on('end', () => {
    ee.emit(GLOBAL_EVENTS.cameraOff);
    log('bye bye');
  });
};


module.exports = {
  socketListener
};
