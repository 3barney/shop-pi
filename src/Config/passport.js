const mongoose =require('mongoose');
const passport = require('passport');
let UserModel = require('../Features/Users/UserModel');

let local_strategy = require("passport-local").Strategy;

/**
 * Login, Returns User Object
 * username field set to use email
*/
passport.use("local-strategy", new local_strategy({usernameField: 'email', passwordField: 'password'},
  (username, password, done) => {
    UserModel.findOne({email: username, disabled: false}, (error, user) => {
      if (error) {
          return done(error);
      }
      if (!user) {
          return done(null, false, { message: "Incorrect Email" });
      }
      if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    });
  }
));
