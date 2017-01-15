/*
* Contains Bindings to mongoose db Methods, Acts as intermediary between Controller
* and Schema
*/
// firstName: '', secondName: '', phoneNumber: '', email: '', password:
const mongoose = require('mongoose');
let UserModel = require('./UserModel');

class UserService {

  constructor(){
    this.saveUser = this.saveUser.bind(this);
  }

  // Dummy
  fetchUser() {
    return "From the Users Service";
  }

  saveUser(userDetails) {
    let {first_name, second_name, phone, email, password} = userDetails;
    let user = new UserModel();
    user.first_name = first_name;
    user.second_name = second_name;
    user.phone = phone;
    user.email = email;
    user.setPassword(password);

    let userPromise = user.save().exec();
    userPromise
      .then( userData => {
        let userToken = user.generateJWT();
        return {"token": userToken, "userData": userData};
      })
      .catch( error => {
        return error;
      });

  }
}

module.exports = UserService;
