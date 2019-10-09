const path = require('path');
const express = require('express');
const {cameraRoutingCreator} = require('./camera-routing');

const routerCreator = (app) => {
  const router = express.Router();

  router.get('/', (_, res) => {
    res.sendFile(path.join(process.cwd(), 'static', 'index.html'));
  });

  router.get('/check', (_, res) => {
    res.send('ok');
  });

  router.use('/camera', cameraRoutingCreator(app));

  return router;
};

module.exports = {
  routerCreator
};
