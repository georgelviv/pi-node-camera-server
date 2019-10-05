const {socketLog} = require('./log');
const {ee, GLOBAL_EVENTS} = require('src/utils');

const socketListener = (ws) => {
  const log = socketLog('1');
  log('user connected');

  let socketHeaderSent = false;

  const onCameraMpeg = ({socketHeader, msg}) => {
    if (!socketHeaderSent) {
      ws.send(socketHeader);
      socketHeaderSent = true;
    } else {
      ws.send(msg);
    }
  };

  ws.on('close', () => {
    log('disconnected');
    ee.removeListener(GLOBAL_EVENTS.cameraMpeg, onCameraMpeg);
  });

  ee.on(GLOBAL_EVENTS.cameraMpeg, onCameraMpeg);
};

module.exports = {
  socketListener
};
