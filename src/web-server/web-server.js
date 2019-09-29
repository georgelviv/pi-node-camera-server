const http = require('http');
const express = require('express');
const morgan = require('morgan');
const {router} = require('./routing');
const {initSocket} = require('./socket');


const initWebServer = ({
  webServerPort
}) => {
  const app = express();
  const server = http.createServer(app);

  initSocket(server);

  app.use(morgan('tiny'));
  app.use(router);

  server.listen(webServerPort, () => {
    console.log(`Listening at port ${webServerPort}`);
  });
};

module.exports = {
  initWebServer
};
