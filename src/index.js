require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  CAMERA_CLIENT_PORT,
  CAMERA_CLIENT_ADDRESS,
  STREAMING_PORT,
  CAMERA_WEB_SERVER_PORT
} = process.env;
const {WebServer} = require('./web-server');

const webServer = new WebServer({
  port: WEB_SERVER_PORT,
  camera: {
    port: CAMERA_CLIENT_PORT,
    address: CAMERA_CLIENT_ADDRESS,
    webPort: CAMERA_WEB_SERVER_PORT
  },
  streaming: {
    port: STREAMING_PORT
  }
});

webServer.setup();
