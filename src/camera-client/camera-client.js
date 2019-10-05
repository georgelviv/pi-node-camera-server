const WebSocket = require('ws');
const {noop} = require('src/utils');
const {log} = require('./log');

class CameraClient {
  constructor({port, address, onMsg}) {
    this.port = port;
    this.address = address;
    this.socketHeader = null;
    this.onMsg = onMsg || noop;

    this.reconnect = true;
    this.reconnectTimeout = 5000;
  }

  get fullAddress() {
    return `ws://${this.address}:${this.port}/`;
  }

  handleEnd() {
    if (this.connected) {
      log('Connection closed');
    }
    this.connected = false;

    setTimeout(() => {
      this.connect(true);
    }, this.reconnectTimeout);
  }

  connect(reconnect = false) {
    this.client = new WebSocket(this.fullAddress, {
      perMessageDeflate: false
    });

    if (reconnect) {
      log('Reconnecting...');
    } else {
      log('Connecting...');
    }

    this.client.on('message', this.handleMsg.bind(this));

    this.client.on('close', () => {
      this.handleEnd();
    });

    this.client.on('error', (err) => {
      log('error', err);
    });

    this.client.on('open', () => {
      log(`connected at ${this.port}`);
      this.connected = true;
    });

    this.client.on('unexpected-response', () => {
      log('unexpected');
    })
  }

  handleMsg(msg) {
    if (!this.socketHeader) {
      this.socketHeader = msg;
    }

    const data = {
      header: this.socketHeader,
      body: msg
    };

    this.onMsg(data);
  }
}

module.exports = {
  CameraClient
};
