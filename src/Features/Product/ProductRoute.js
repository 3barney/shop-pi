"use strict";
const express = require('express');
let AuthMiddleware = require('../../Config/AuthMiddleware');
let ProductCtrl = require('./ProductController');
let ProductRoute = express.Router();

ProductRoute.get('/product', AuthMiddleware.userAuthMiddleware, ProductCtrl.getAllProducts);
ProductRoute.post('/product', AuthMiddleware.userAuthMiddleware, ProductCtrl.addProduct);
ProductRoute.put('/product/:id', AuthMiddleware.userAuthMiddleware, ProductCtrl.editProduct);

module.exports = ProductRoute;
