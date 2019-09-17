const express = require('express');
const {takePhoto} = require('./camera');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await takePhoto();
  res.json(result);
});

module.exports = {
  router
};
