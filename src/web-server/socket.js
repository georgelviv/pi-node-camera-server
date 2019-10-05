// const WebSocketServer = require('websocket').server;
const {socketListener} = require('./socket-listener');
const WebSocket = require('ws');

const initSocket = (server) => {
  const wss = new WebSocket.Server({server});

  wss.on('connection', socketListener);
};

module.exports = {
  initSocket
};
