/**
* Defines the User Schema and Related methods to be done on Schema
*/

const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken');
const crypto = require("crypto");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: { type: String, trim: true, required: "Email cannot be empty", unique: true},
  first_name: { type: String},
  second_username: { type: String, unique: true, required: "Username cannot be empty"},
  phone: {type: String, unique: true},
  hash: { type: String },
  salt: { type: String },
  disabled: { type: Boolean, default: false },
  created_at: { type: Date, required: false},
  modified_at: { type: Date, required: false},
}, {timestamps: true});

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString("hex");
};

UserSchema.methods.validPassword = (password) => {
  let self = this;
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
    return this.hash === hash;
};

UserSchema.methods.generateJWT = () => {
  let self = this;
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jsonwebtoken.sign({
        _id: this.id,
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JSONWEBTOKEN_SECRET);
};

// on every save, add the date
UserSchema.pre('save', (next) => {
  let currentDate = new Date();
  this.modified_at = currentDate;
  if(!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('users', UserSchema);
