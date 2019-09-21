const http = require('http');
const express = require('express');
const morgan = require('morgan');
const {router} = require('./routing');
const {initSocket} = require('./socket');


const initServer = (port) => {
  const app = express();
  const server = http.createServer(app);

  initSocket(server);

  app.use(morgan('tiny'));
  app.use(router);

  server.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
};

module.exports = {
  initServer
};
