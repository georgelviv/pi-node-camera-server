const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const ee = new MyEmitter();

module.exports = {
  ee
};
