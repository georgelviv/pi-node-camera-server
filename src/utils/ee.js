const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const ee = new MyEmitter();

const GLOBAL_EVENTS = {
  cameraOn: 'camera-on',
  cameraOff: 'camera-off',
  cameraImg: 'camera-img',
  cameraMpeg: 'camera-mpeg'
};

module.exports = {
  ee, GLOBAL_EVENTS
};
