const _ = require('lodash');

let UserModelService = require('./UserService');
let UserService = new UserModelService();

// // firstName: '', secondName: '', phoneNumber: '', email: '', password:
class UserController {

  constructor() {
    this.getUser = this.getUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
  }

  getUser(req, res) {
    let user = UserService.fetchUser();
    console.log("am hit also i am mara saba");
    res.json(user);
  }

  registerUser(req, res) {
    console.log("req.body")
    console.log(req.body)
    let errors = {};
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let first_name = req.body.firstName;
    let second_name = req.body.secondName;
    let phone = req.body.phoneNumber;
    let email = req.body.email;
    let password = req.body.password;

    if(_.isNil(first_name) || _.isNil(second_name) || _.isNil(email) || _.isNil(password)) {
      errors.empty = `The fields cannot be empty`;
      this.sendJsonResponse(res, 200, errors);
      return;
    }

    if(!regex.test(email)){
      errors.email = `Not a valid email address`;
      this.sendJsonResponse(res, 200, errors);
      return;
    }

    let user = {first_name, second_name, phone, email, password};

    let savedUser = UserService.saveUser(user);
    this.sendJsonResponse(res, 200, savedUser);
  }
}

module.exports = UserController;
