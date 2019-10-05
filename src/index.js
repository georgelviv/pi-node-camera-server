require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  CAMERA_CLIENT_PORT,
  CAMERA_CLIENT_ADDRESS
} = process.env;
const {initWebServer} = require('./web-server');
const {initCameraClient} = require('./camera-client');

initCameraClient({
  port: CAMERA_CLIENT_PORT,
  address: CAMERA_CLIENT_ADDRESS
});
initWebServer({webServerPort: WEB_SERVER_PORT});
