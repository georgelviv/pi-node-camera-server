const http = require('http');
const express = require('express');
const {routerCreator} = require('./routing');

const {log} = require('./log');
const {CameraClient} = require('src/camera-client');
const {CameraStreaming} = require('src/camera-streaming');
const {ee, handleSigterm} = require('src/utils');
const {applyMiddlewares} = require('./middlewares');

class WebServer {
  constructor(configs) {
    this.ee = ee;
    this.streamBufferName = 'stream-buffer';

    this.cameraAddress = `http://${configs.camera.address}:${configs.camera.webPort}`;

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
    this.serverName = configs.serverName;

    handleSigterm(this.handleSigTerm.bind(this));
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

    applyMiddlewares(this.app);
    this.app.use(routerCreator(this));

    this.server.listen(this.port, () => {
      log(`listen at ${this.port}`);
    });
  }

  handleSigTerm() {
    log('Stopping server');
    this.server.close();
    this.cameraClient.close();
    this.cameraStreaming.close();
  }
}

module.exports = {
  WebServer
};
