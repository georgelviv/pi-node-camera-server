require('dotenv').config();
require('module-alias/register');

const {
  WEB_SERVER_PORT,
  // CAMERA_STREAMING_PORT,
  // CAMERA_STREAMING_VIDEO,
  CAMERA_CLIENT_PORT,
  CAMERA_CLIENT_ADDRESS
} = process.env;
// const {initCameraSocket} = require('./camera-socket');
const {initWebServer} = require('./web-server');
const {initCameraClient} = require('./camera-client');

// initCameraSocket({
//   cameraStreamingPort: CAMERA_STREAMING_PORT,
//   isVideoStream: CAMERA_STREAMING_VIDEO
// });
initCameraClient({
  port: CAMERA_CLIENT_PORT,
  address: CAMERA_CLIENT_ADDRESS
});
initWebServer({webServerPort: WEB_SERVER_PORT});
