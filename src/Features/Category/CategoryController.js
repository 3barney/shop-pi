const express = require('express');
const _ = require('lodash');
let CategoryService = require('./CategoryService');
let UserAuthMiddleware = require('../../Config/AuthMiddleware');

exports.fetchAllCategories = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    CategoryService.fetchAllCategories( (categories) => {
      if(categories.categories.length === 0 && _.isNil(categories.errors)) {
        sendJsonResponse(res, 200, {"message": "No Categories Yet"});
        return;
      } else if (_.isNil(categories.categories)) {
        sendJsonResponse(res, 200, categories.errors);
        return;
      }
      sendJsonResponse(res, 200, categories.categories);
    });
  });
};

exports.createCategory = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    let error = [];
    let category_name = req.body.name;
    let category_slug = req.body.slug;

    if(_.isNil(category_name)) {
      error.push(`Name is required`);
    }

    let cat = {category_name, category_slug, user_id};
    CategoryService.createCategory(cat, (createdCategory) => {
      console.log(createdCategory);
    });
  })
}

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
