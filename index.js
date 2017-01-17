/*eslint-disable no-console*/
"use strict"
require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const logger = require('./src/Config/logger');

let app = express();

require('./src/Config/passport');
require('./src/Config/database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let allowCrossOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS,HEAD");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Content-Type, Accept,X-Requested-With, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
};

app.use(allowCrossOrigin);

app.get('/', (req, res) => {
  res.json("Welcome to the only universe");
});

app.use(passport.initialize());

let UserRoute = require('./src/Features/Users/userRoutes');

logger.debug("Overriding 'Express' logger");
app.use(require("morgan")("combined", { stream: logger.stream }));

app.use("/api/v1", UserRoute);

// Error Middleware
app.use( (err, req, res, next) => {
  if(err.errno === 'EADDRINUSE')
       logger.debug("Port Busy");
  else
       logger.debug(err);
  next();
});

const port = +process.env.PORT || 6060;
const server = app.listen(port, "localhost" , () => {
    const {address, port} = server.address();
    console.log("Listening on http://localhost:" + port);
});
