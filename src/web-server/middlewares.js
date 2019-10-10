const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.static('static'));
  app.use(morgan('tiny'));
  app.use(bodyParser.json());
};

module.exports = {
  applyMiddlewares
};
