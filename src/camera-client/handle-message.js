const {ee, GLOBAL_EVENTS} = require('src/utils');

const handleMessage = (msg) => {
  ee.emit(GLOBAL_EVENTS.cameraMpeg, msg.binaryData);
};

module.exports = {
  handleMessage
};

