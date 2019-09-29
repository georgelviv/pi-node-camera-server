const socketIo = require('socket.io');
const {ee} = require('src/utils');

const initSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('user connected to socket', socket);
  });

  ee.on('img', (img) => {
    io.emit('image', img.toString('base64'));
  });
};

module.exports = {
  initSocket
};
