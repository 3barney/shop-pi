"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: "Product Name is needed"},
  price: { type: Number, required: "Specify a Value"},
  description: { type: String},
  color: { type: String},
  size: { type: String},
  imageLink: { type: String},
  quantity: {type: Number},
  category_id: {type: Schema.Types.ObjectId, ref: 'Category'}
  // category_name
}, {timestamps: true});

mongoose.exports = mongoose.model('Product', ProductSchema);
