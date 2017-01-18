const express = require('express');
let AuthMiddleware  = require('../../Config/AuthMiddleware');
let CategoryController = require('./CategoryController');
let CategoryRoute = express.Router();

CategoryRoute.get(
  '/category', AuthMiddleware.userAuthMiddleware, CategoryController.fetchAllCategories
);
CategoryRoute.post(
  '/category', AuthMiddleware.userAuthMiddleware, CategoryController.createCategory
);

module.exports = CategoryRoute;
