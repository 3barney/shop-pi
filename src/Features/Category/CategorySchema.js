"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: { type: String, required: "Category Name is needed"},
  slug: { type: String},
  disabled: { type: Boolean, default: false },
  created_by: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: { type: Date, required: false},
  modified_at: { type: Date, required: false},
});

CategorySchema.pre('save', (next) => {
  let currentDate = new Date();
  this.modified_at = currentDate;
  if(!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Category', CategorySchema);
