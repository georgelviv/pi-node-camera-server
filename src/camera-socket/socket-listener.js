const {ee} = require('src/utils');
const {socketLog} = require('./log');
const {ImgBuf} = require('./image-buf');

const socketListener = (socket) => {
  const {address} = socket.address();
  const log = socketLog(address.slice(-3));
  const handler = (img) => {
    log('image received');
    ee.emit('img', img);
  };
  const imgBuf = new ImgBuf({handler});

  log('client connected');

  socket.on('data', (msg) => {
    imgBuf.push(msg);
  });

  socket.on('end', () => {
    log('bye bye');
  });
};


module.exports = {
  socketListener
};
