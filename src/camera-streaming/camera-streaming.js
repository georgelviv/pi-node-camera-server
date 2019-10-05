const WebSocket = require('ws');
const {log} = require('./log');

class CameraStreaming {
  constructor({port, ee, eventName}) {
    this.port = port;
    this.ee = ee;
    this.eventName = eventName;
  }

  listen() {
    this.wss = new WebSocket.Server({port: this.port});
    log(`listen at ${this.port}`);

    this.wss.on('connection', this.listener.bind(this));
  }

  listener(ws) {
    log('Client connected');

    let socketHeaderSent = false;
    const eventHandler = ({header, body}) => {
      if (!socketHeaderSent) {
        ws.send(header);
        socketHeaderSent = true;
      } else {
        ws.send(body);
      }
    };

    this.ee.on(this.eventName, eventHandler);

    ws.on('close', () => {
      log('Client disconnected');
      this.ee.removeListener(this.eventName, eventHandler);
    });
  }
}

module.exports = {
  CameraStreaming
};
