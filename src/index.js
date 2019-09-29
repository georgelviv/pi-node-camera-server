require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  CAMERA_STREAMING_PORT
} = process.env;
const {initCameraSocket} = require('./camera-socket');
const {initWebServer} = require('./web-server');

initCameraSocket({cameraStreamingPort: CAMERA_STREAMING_PORT});
// initWebServer({webServerPort: WEB_SERVER_PORT});
