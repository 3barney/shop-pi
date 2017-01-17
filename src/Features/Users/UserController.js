const _ = require('lodash');
let UserService = require('./UserService');
let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

exports.getUser = (req, res) => {
  console.log(req.body)
  res.json("Contact me at brnbsjm@gmail.com");
};

exports.registerUser = (req, res) => {
  console.log(req.body)
  let errors = {};
  let first_name = req.body.firstName;
  let second_name = req.body.secondName;
  let phone = req.body.phoneNumber;
  let email = req.body.email;
  let password = req.body.password;

  if(_.isNil(first_name) || _.isNil(second_name) || _.isNil(email) || _.isNil(password)) {
    errors.empty = `The fields cannot be empty`;
    sendJsonResponse(res, 404, errors);
    return;
  }

  if(!regex.test(email)){
    errors.email = `Not a valid email address`;
    sendJsonResponse(res, 404, errors);
    return;
  }

  let user = {first_name, second_name, phone, email, password};
  UserService.saveUser(user, (response) => {
    if (_.isNil(response.user)) {
      sendJsonResponse(res, 404, response.errors);
      return;
    }

    let savedUserInfo = {
      "token": response.user.token,
      "_id": response.user.userData._id,
      "email": response.user.userData.email,
      "first_name": response.user.userData.first_name,
      "second_name": response.user.userData.second_name,
      "phone_number": response.user.userData.phone
    };
    sendJsonResponse(res, 200, savedUserInfo);
  });
};

exports.loginUser = (req, res) => {
  let errors = {};
  let email = req.body.email;
  let password = req.body.password;

  if(_.isNil(email) || _.isNil(password)) {
    errors.empty = `The fields cannot be empty`;
    sendJsonResponse(res, 404, errors);
    return;
  }

  if(!regex.test(email)){
    errors.email = `Not a valid email address`;
    sendJsonResponse(res, 404, errors);
    return;
  }

  let user = {email, password};
  UserService.login(req, res, user, (loggedInUser) => {
    if (_.isEmpty(loggedInUser.errors) && _.isEmpty(loggedInUser.info)) {
      sendJsonResponse(res, 404, loggedInUser.user);
      return;
    } else if(_.isEmpty(loggedInUser.errors)) {
      sendJsonResponse(res, 404, loggedInUser.info);
      return;
    }
    sendJsonResponse(res, 404, loggedInUser.errors);
  });

};
