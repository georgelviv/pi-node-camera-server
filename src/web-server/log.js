const {logger} = require('src/utils');

const log = logger('CameraSocket');
const socketLog = (address) => logger(`CameraSocketClient ${address}`);

module.exports = {
  log, socketLog
};
