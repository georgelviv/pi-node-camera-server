require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  CAMERA_CLIENT_PORT,
  CAMERA_CLIENT_ADDRESS,
  STREAMING_PORT,
  CAMERA_WEB_SERVER_PORT,
  SERVER_NAME,
  CONTROLLER_ADDRESS,
  CONTROLLER_PORT
} = process.env;
const {WebServer} = require('./web-server');

const webServer = new WebServer({
  port: WEB_SERVER_PORT,
  camera: {
    port: CAMERA_CLIENT_PORT,
    address: CAMERA_CLIENT_ADDRESS,
    webPort: CAMERA_WEB_SERVER_PORT
  },
  controller: {
    port: CONTROLLER_PORT,
    address: CONTROLLER_ADDRESS
  },
  streaming: {
    port: STREAMING_PORT
  },
  serverName: SERVER_NAME
});

webServer.setup();
