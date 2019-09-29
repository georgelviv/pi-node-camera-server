const http = require('http');
const express = require('express');
const morgan = require('morgan');
const {router} = require('./routing');
const {initSocket} = require('./socket');
const {log} = require('./log');


const initWebServer = ({
  webServerPort
}) => {
  const app = express();
  const server = http.createServer(app);

  initSocket(server);

  app.use(morgan('tiny'));
  app.use(router);

  server.listen(webServerPort, () => {
    log(`Listening at port ${webServerPort}`);
  });
};

module.exports = {
  initWebServer
};
