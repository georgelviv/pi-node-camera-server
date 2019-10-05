const http = require('http');
const express = require('express');
const morgan = require('morgan');
const {router} = require('./routing');

const {log} = require('./log');
const {CameraClient} = require('src/camera-client');
const {CameraStreaming} = require('src/camera-streaming');
const {ee} = require('src/utils');

class WebServer {
  constructor(configs) {
    this.ee = ee;
    this.streamBufferName = 'stream-buffer';

    this.port = configs.port;
    this.cameraClient = new CameraClient({
      port: configs.camera.port,
      address: configs.camera.address,
      onMsg: this.handleCameraMsg.bind(this)
    });
    this.cameraStreaming = new CameraStreaming({
      port: configs.streaming.port,
      ee: this.ee,
      eventName: this.streamBufferName
    });
  }

  handleCameraMsg(msg) {
    this.ee.emit(this.streamBufferName, msg);
  }

  setup() {
    this.cameraClient.connect();
    this.setWebServer();
    this.cameraStreaming.listen();
  }

  setWebServer() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.addMiddlewares();
    this.server.listen(this.port, () => {
      log(`listen at ${this.port}`);
    });
  }

  addMiddlewares() {
    this.app.use(express.static('static'));
    this.app.use(morgan('tiny'));
    this.app.use(router);
  }
}

module.exports = {
  WebServer
};
