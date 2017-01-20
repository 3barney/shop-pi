"use strict";
const mongoose = require('mongoose');
let ProductSchema = require('./ProductSchema');
require("mongoose").Promise = require("bluebird");

exports.getAllProducts = (callback) => {
  let productPromise = ProductSchema.find()
    .populate('created_by', 'first_name second_name email')
    .exec();
  productPromise
    .then( (products) => {
      callback ({"products": products});
    })
    .catch( (error) => {
      return callback({"error": error});
    });
};

exports.createProduct = (prod, callback) => {
  let {
    product_name, product_description, product_slug, product_price, product_image,
    product_quantity, product_color, product_size, product_categoryName, user_id
  } = prod;
  let Product = new ProductSchema();
  Product.name = product_name;
  Product.description = product_description;
  Product.slug = product_slug;
  Product.price = product_price;
  Product.imageLink = product_image;
  Product.quantity = product_quantity;
  Product.color = product_color;
  Product.size = product_size;
  Product.category_name = product_categoryName;
  Product.created_by = user_id;

  let productPromise = Product.save();
  productPromise
    .then( (product) => {
      callback({"product": product});
    })
    .catch( (error) => {
      callback({"error": error});
    });
};

exports.updateSingleProduct = (productID, prod, callback) => {
  let {
    new_product_name, new_product_description, new_product_slug, new_product_price,
    new_product_image, new_product_quantity, new_product_color, new_product_size,
    new_product_categoryName, user_id
  } = prod;
  let updatedProductPromise = ProductSchema.findById(productID).exec();
  updatedProductPromise
    .then( (product) => {
      product.name = new_product_name;
      product.slug = new_product_slug;
      product.price = new_product_price;
      product.description = new_product_description;
      product.color = new_product_color;
      product.size = new_product_size;
      product.imageLink = new_product_image;
      product.quantity = new_product_quantity;
      product.category_name = new_product_categoryName;
      product.created_by = user_id;
      return product.save();
    })
    .then( (updatedProduct) => {
      callback({"product": updatedProduct});
    })
    .catch( (error) => {
      callback({"error": error});
    });
};
