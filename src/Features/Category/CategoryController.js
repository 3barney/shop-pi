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

    if(_.isNil(category_name)) {
      error.push(`Name is required`);
    }

    const category_slug = _.kebabCase(category_name);
    let cat = {category_name, category_slug, user_id};
    CategoryService.createCategory(cat, (createdCategory) => {
      if (!_.isNil(createdCategory.category)) {
        sendJsonResponse(res, 200, createdCategory);
        return;
      }
      sendJsonResponse(res, 404, createdCategory.error);
    });
  });
};

exports.updateCategory = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    const categoryId = req.params.id;
    const newCategoryName = req.body.name;
    const newCategorySlug = _.kebabCase(newCategoryName);
    let cat = {newCategoryName, newCategorySlug, user_id};
    if(_.isEqual(categoryId, req.body._id)){
      CategoryService.updateSingleCategory(categoryId, cat, (updatedCategory) => {
        if (!_.isNil(updatedCategory.category)) {
          sendJsonResponse(res, 200, updatedCategory.category);
        }
        sendJsonResponse(res, 404, updatedCategory.error);
      });
    } else {
      sendJsonResponse(res, 404, `Category Not Found`);
    }
  });
};

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
