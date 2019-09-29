const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'static', 'index.html'));
});

router.get('/check', (_, res) => {
  res.send('ok');
});

module.exports = {
  router
};
