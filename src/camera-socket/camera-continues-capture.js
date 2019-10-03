const {ee} = require('src/utils');
const {ImgBuf} = require('./image-buf');


const cameraContinuesCapture = (socket) => {
  const handler = (img) => {
    ee.emit('img', img);
  };

  const imgBuf = new ImgBuf({handler});

  socket.on('data', (msg) => {
    imgBuf.push(msg);
  });
};

module.exports = {
  cameraContinuesCapture
};
