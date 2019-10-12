const express = require('express');
const request = require('request');

const cameraRoutingCreator = (app) => {
  const router = express.Router();

  router.get('/status', (_, res) => {
    res.json({
      'connected': app.cameraClient.connected
    });
  });

  router.get('/settings', (req, res) => {
    const address = `${app.cameraAddress}/camera-settings`;
    const queryParams = {iso: req.query.iso};
    request({url: address, qs:queryParams}, () => {
      res.json({
        'updated': true
      });
    });
  });

  return router;
};

module.exports = {
  cameraRoutingCreator
};
