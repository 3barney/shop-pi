
const express = require('express');
let UserController = require("./UserController");
let UserRoute = express.Router();

let UserHandler = new UserController();
UserRoute.get('/user', UserHandler.getUser);
UserRoute.post('/user/register', UserHandler.registerUser);

module.exports = UserRoute;
