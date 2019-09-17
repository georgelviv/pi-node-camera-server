require('dotenv').config();

const {initServer} = require('./server');
const port = process.env.SERVER_PORT;

initServer(port);

