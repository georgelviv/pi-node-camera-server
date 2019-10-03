const net = require('net');
const {log} = require('./log');
const {socketListener} = require('./socket-listener');

const initCameraSocket = ({cameraStreamingPort, isVideoStream}) => {
  const server = net.createServer(socketListener(isVideoStream));

  server.listen(cameraStreamingPort, () => {
    log(`listen on port ${cameraStreamingPort}`);
  });
};

module.exports = {
  initCameraSocket
};
