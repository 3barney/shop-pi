"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: { type: String, required: "Category Name is needed"},
  slug: { type: String},
  disabled: { type: Boolean, default: false },
  created_by: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);
