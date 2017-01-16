/*
* Contains Bindings to mongoose db Methods, Acts as intermediary between Controller
* and Schema
*/

"use strict"
const mongoose = require('mongoose');
const passport = require('passport');
let UserSchema = require('./UserSchema');
require("mongoose").Promise = require("bluebird");

exports.saveUser = (userDetails, callback) => {
  let {first_name, second_name, phone, email, password} = userDetails;
  let user = new UserSchema();

  user.first_name = first_name;
  user.second_name = second_name;
  user.phone = phone;
  user.email = email;
  user.setPassword(password);

  let userPromise = user.save();
  userPromise
    .then( (userData) => {
      let userToken = user.generateJWT();
      return {"user" : {"token": userToken, "userData": userData}};
    })
    .then( (savedUser) => {
      callback(savedUser);
    })
    .catch( error => {
      callback({"errors": error});
    });
};

exports.login = (req, res, userCredentials, callback) => {
  let {email, password} = userCredentials;
  passport.authenticate("local-strategy", (error, isLoggedInUser, info) => {
    let token;
    let user_id = isLoggedInUser._id;
    let email = isLoggedInUser.email;
    let phone = isLoggedInUser.phone;
    let first_name = isLoggedInUser.first_name;
    let second_name = isLoggedInUser.second_name;
    let logged_user_data = {
      "user_id": user_id, "email": email, "first_name": first_name,
      "second_name": second_name, "phone": phone
    };
    if (error) {
      callback({"errors": error});
    } else if (!isLoggedInUser) {
      callback({"info": info});
    }
    token = isLoggedInUser.generateJWT();
    callback({"user": {"token": token, "userData": logged_user_data}});
  })(req, res);
};
