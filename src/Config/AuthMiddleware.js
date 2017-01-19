"use strict";

const express = require('express');
const expressJsonWebToken = require('express-jwt');
const logger = require('./logger');
let UserSchema = require('../Features/Users/UserSchema');

exports.userAuthMiddleware = expressJsonWebToken({
  secret: process.env.JSONWEBTOKEN_SECRET,
  userProperty: 'shop_rest_api'
});

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

exports.getLoggedInUser = (req, res, callback) => {
  let userId = req.shop_rest_api._id;
  if(req.shop_rest_api && userId) {
    UserSchema.findById(userId)
      .exec( (error, user) => {
        if (!user) {
            sendJsonResponse(res, 404, { "message": "User Not found" });
            return;
        } else if (error) {
            logger.error("Authentication Error", error);
            return;
        }
        callback(req, res, user._id);
      });
  } else {
    sendJsonResponse(res, 401, {"message" : "Please Login First"});
  }
};
