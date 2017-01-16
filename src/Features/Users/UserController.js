const _ = require('lodash');
let UserService = require('./UserService');
let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

exports.getUser = (req, res) => {
  res.json("user jomo");
};

exports.registerUser = (req, res) => {
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
    sendJsonResponse(res, 200, response.user);
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

}
/*
if (_.isNil(response.user)) {
  sendJsonResponse(res, 404, response.errors);
  return;
}
sendJsonResponse(res, 200, response.user);
});
*/
