const {spawn} = require('child_process');


const takePhoto = () => {
  return new Promise((resolve, reject) => {
    const child = spawn('pwd');
    let payload = '';

    child.stdout.on('data', (data) => {
      payload += data;
    });

    child.on('exit', (code, signal) => {
      let data = payload.toString();
      resolve({code, signal, data});
    });
  });
};

module.exports = {
  takePhoto
};
