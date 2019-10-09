const express = require('express');

const cameraRoutingCreator = (app) => {
  const router = express.Router();

  router.get('/status', (_, res) => {
    res.json({
      'connected': app.cameraClient.connected
    });
  });

  return router;
};

module.exports = {
  cameraRoutingCreator
};
