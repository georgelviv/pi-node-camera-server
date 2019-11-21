const path = require('path');
const express = require('express');
const request = require('request');
const {cameraRoutingCreator} = require('./camera-routing');

const routerCreator = (app) => {
  const router = express.Router();

  router.get('/', (_, res) => {
    res.sendFile(path.join(process.cwd(), 'static', 'index.html'));
  });

  router.get('/check', (_, res) => {
    res.send('ok');
  });

  router.get('/controller-status', (req, res) => {
    const address = `${app.controllerAddress}/status`;
    request({url: address}, (err, response, body) => {
      if (err) {
        console.log('/controller-status error', err)
        res.send(err);
      } else {
        res.json(JSON.parse(body));
      }
    });
  });

  router.use('/camera', cameraRoutingCreator(app));

  router.use('*', (_, res) => {
    res.send('hey men, its 404')
  })

  return router;
};

module.exports = {
  routerCreator
};
