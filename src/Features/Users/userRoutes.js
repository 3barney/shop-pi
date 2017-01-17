
const express = require('express');
let UserController = require("./UserController");
let UserRoute = express.Router();

UserRoute.get('/user', UserController.getUser);
UserRoute.post('/user/register', UserController.registerUser);
UserRoute.get('/user/register', UserController.getUser);
UserRoute.post('/user/login', UserController.loginUser);

module.exports = UserRoute;
