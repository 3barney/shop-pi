"use strict";
const express = require('express');
let AuthMiddleware = require('../../Config/AuthMiddleware');
let ProductCtrl = require('./ProductController');
let ProductRoute = express.Router();

ProductRoute.get('/product', AuthMiddleware.userAuthMiddleware, ProductCtrl.getProducts);

module.exports = ProductRoute;
