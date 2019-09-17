const express = require('express');
const morgan = require('morgan');
const {router} = require('./routing');
const app = express();

const initServer = (port) => {
  app.use(morgan('tiny'));
  app.use(router);

  app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
};

module.exports = {
  initServer
};
