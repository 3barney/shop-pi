const express = require('express');

let UserAuthMiddleware = require('../../Config/AuthMiddleware');

exports.testDummyGet = (req, res) => {
  UserAuthMiddleware.getLoggedInUser(req, res, (req, res, user_id) => {
    console.log(user_id);
  });
}
