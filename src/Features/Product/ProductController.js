const express = require('express');
const _ = require('lodash');
let UserAuthMiddleware = require('../../Config/AuthMiddleware');
let ProductService = require('./ProductService');

exports.getAllProducts = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    ProductService.getAllProducts( (products) => {
      if(products.products.length === 0 && _.isNil(products.error)) {
        sendJsonResponse(res, 200, { "message": "No Product Yet"});
        return;
      } else if(_.isNil(products.products)) {
        sendJsonResponse(res, 404, products.errors);
        return;
      }
      sendJsonResponse(res, 200, products.products);
    });
  });
};

exports.addProduct = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    let error = [];
    let product_name = req.body.name;
    let product_description = req.body.description;
    let product_price = req.body.price;
    let product_image = req.body.image;
    let product_quantity = req.body.quantity;
    let product_color = req.body.color;
    let product_size = req.body.size;
    let product_categoryName = req.body.category_name;

    if(_.isNil(product_name) || _.isNil(product_price)) {
      error.push(`Fields Cannot be empty`);
    }

    const product_slug = _.kebabCase(product_name);
    let prod = {
      product_name, product_description, product_slug, product_price, product_image,
      product_quantity, product_color, product_size, product_categoryName, user_id
    };
    ProductService.createProduct(prod, (createdProd) => {
      if(error.length > 0) {
        sendJsonResponse(res, 404, error);
        return;
      } else if(!_.isNil(createdProd.product)) {
        sendJsonResponse(res, 200, createdProd.product);
        return ;
      }
      sendJsonResponse(res, 400, createdProd.error);
    });
  });
};

exports.editProduct = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    const productID = req.params.id;
    let new_product_name = req.body.name;
    let new_product_description = req.body.description;
    let new_product_price = req.body.price;
    let new_product_image = req.body.image;
    let new_product_quantity = req.body.quantity;
    let new_product_color = req.body.color;
    let new_product_size = req.body.size;
    let new_product_categoryName = req.body.category_name;

    const new_product_slug = _.kebabCase(new_product_name);
    let prod = {
      new_product_name, new_product_description, new_product_slug, new_product_price,
      new_product_image, new_product_quantity, new_product_color, new_product_size,
      new_product_categoryName, user_id
    };

    if(_.isEqual(productID, req.body._id)) {
      ProductService.updateSingleProduct(productID, prod, (updatedProduct) => {
        if (!_.isNil(updatedProduct.product)) {
          sendJsonResponse(res, 200, updatedProduct.product);
        }
        sendJsonResponse(res, 404, updatedProduct.error);
      });
    } else {
      sendJsonResponse(res, 404, `Product Not Found`);
    }
  });
};

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
