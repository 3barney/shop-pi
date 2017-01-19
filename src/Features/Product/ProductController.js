const express = require('express');
const _ = require('lodash');
let UserAuthMiddleware = require('../../Config/AuthMiddleware');

exports.getProducts = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    sendJsonResponse(res, 200, "am hit")
  });
};

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}
