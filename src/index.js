require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  CAMERA_CLIENT_PORT,
  CAMERA_CLIENT_ADDRESS,
  STREAMING_PORT
} = process.env;
const {WebServer} = require('./web-server');

const webServer = new WebServer({
  port: WEB_SERVER_PORT,
  camera: {
    port: CAMERA_CLIENT_PORT,
    address: CAMERA_CLIENT_ADDRESS
  },
  streaming: {
    port: STREAMING_PORT
  }
});

webServer.setup();
