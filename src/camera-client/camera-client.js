const WebSocketClient = require('websocket').client;
const {log} = require('./log');
const {handleMessage} = require('./handle-message');

const initCameraClient = ({port, address}) => {
  const client = new WebSocketClient();

  client.on('connectFailed', (err) => {
    log(`connect failed ${err}`);
  });

  client.on('connect', (connection) => {
    log('connected');

    connection.on('error', (err) => {
      log(`connection failed ${err}`);
    });

    connection.on('message', handleMessage);
  });

  client.connect(`ws://${address}:${port}/`);
};

module.exports = {
  initCameraClient
};
