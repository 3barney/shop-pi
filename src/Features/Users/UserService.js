/*
* Contains Bindings to mongoose db Methods, Acts as intermediary between Controller
* and Schema
*/

// let UserModel = require('./UserModel')

class UserService {

  // Dummy
  fetchUser() {
    return "am hit";
  }


  saveUser(userDetails) {
    return(userDetails);
  }
}

module.exports = UserService;
