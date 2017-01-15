let UserService = require('./UserService');
let UserHand = new UserService();

class UserController {

  getUser(req, res) {
    let user = UserHand.fetchUser();
    console.log("am hit also i am mara saba");
    res.json(user);
  }

  registerUser(req, res) {
    let user = UserHand.saveUser(req.body)
    res.json(user);
  }
}

module.exports = UserController;
