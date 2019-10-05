const {ee, GLOBAL_EVENTS} = require('./ee');
const {logger} = require('./logger');
const {noop} = require('./noop');

module.exports = {
  ee, logger, GLOBAL_EVENTS,
  noop
};
