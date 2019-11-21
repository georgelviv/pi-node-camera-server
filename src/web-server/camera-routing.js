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

  router.get('/server-name', (_, res) => {
    const data = {
      serverName: app.serverName
    }
    res.json(data);
  });

  router.get('/controller-status', (req, res) => {
    const address = `${app.cameraAddress}/status`;
    request({url: address}, (res) => {
      console.log('aaa', res)
      res.json({
        'works': true
      });
    });
  });

  return router;
};

module.exports = {
  cameraRoutingCreator
};
