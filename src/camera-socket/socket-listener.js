const {ee} = require('src/utils');

const socketListener = (socket) => {
  console.log('client connected');

  socket.on('data', (msg) => {

    if (msg.length === 4) {
      const imgLength = msg.readUInt32LE();
      if (image) {
        ee.emit('img', image);
      }
      image = new Img({length: imgLength});
    } else {
      image && image.append(msg);
    }

    console.log(msg.length);
  });

  socket.on('end', () => {
    console.log('bye bye');
  });
};


module.exports = {
  socketListener
};
