require('dotenv').config();
const {SECRET} = process.env;
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000' /* Agrega más orígenes según tus necesidades */,
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
