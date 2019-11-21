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

  router.get('/server-name', (_, res) => {
    const data = {
      serverName: app.serverName
    }
    res.json(data);
  });

  router.use('/camera', cameraRoutingCreator(app));

  return router;
};

module.exports = {
  routerCreator
};
