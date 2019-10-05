const WebSocket = require('ws');
const {ee, GLOBAL_EVENTS} = require('src/utils');
const {log} = require('./log');

const initCameraClient = ({port, address}) => {
  const client = new WebSocket(`ws://${address}:${port}/`, {
    perMessageDeflate: false
  });

  let socketHeader;

  client.on('message', (msg) => {
    if (!socketHeader) {
      socketHeader = msg;
    }

    ee.emit(GLOBAL_EVENTS.cameraMpeg, {
      socketHeader, msg
    });
  });

  client.on('close', () => {
    log('close');
  });

  client.on('error', () => {
    log('error');
  });

  client.on('open', () => {
    log('connected');
  });

};

module.exports = {
  initCameraClient
};
