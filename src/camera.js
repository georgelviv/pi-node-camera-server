const {spawn} = require('child_process');


const initCameraStreaming = () => {
  return spawn('raspivid', ['-t', '0', '-l', '-o', 'tcp://0.0.0.0:3333']);
};

module.exports = {
  initCameraStreaming
};
