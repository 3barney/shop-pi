/*
* Contains Bindings to mongoose db Methods, Acts as intermediary between Controller
* and Schema
*/

"use strict";
const mongoose = require('mongoose');
let CategorySchema = require('./CategorySchema');
require("mongoose").Promise = require("bluebird");

exports.createCategory = (categoryDetails, callback) => {
  let {category_name, category_slug, user_id} = categoryDetails;
  let Category = new CategorySchema();
  Category.name = category_name;
  Category.slug = category_slug;
  Category.created_by = user_id;

  let categoryPromise = Category.save();
  categoryPromise
    .then( (category) => {
      callback({"category": category});
    })
    .catch( (error) => {
      callback({"error": error});
    });
};

exports.fetchAllCategories = (callback) => {
  let categoryPromise = CategorySchema.find({})
    .populate('created_by', 'first_name second_name email')
    .exec();
  categoryPromise
    .then( (categories) => {
      return ({"categories": categories});
    })
    .then( (cats) => {
      callback(cats);
      return null;
    })
    .catch( (error) => {
      return callback({"error": error});
    });
};

exports.updateSingleCategory = (categoryId, cat, callback) => {
  let {newCategoryName, newCategorySlug, user_id} = cat;
  let updatedCatPromise = CategorySchema.findById(categoryId).exec();
  updatedCatPromise
    .then( (category) => {
      category.name = newCategoryName;
      category.slug = newCategorySlug;
      category.created_by = user_id;
      return category.save();
    })
    .then( (updatedCategry) => {
      callback({"category": updatedCategry});
    })
    .catch( error => {
      callback({"error": error});
    });
};
