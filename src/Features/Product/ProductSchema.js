"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: "Product Name is needed"},
  slug: { type: String },
  price: { type: String, required: "Specify a Value"},
  description: { type: String},
  color: { type: Array},
  size: { type: Array},
  imageLink: { type: String},
  quantity: {type: Number},
  category_name: {type: String, field: 'name', ref: 'Category'},
  created_by: {type: Schema.Types.ObjectId, ref: 'User'}
  disabled: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);
