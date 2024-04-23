const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  business_name: {
    type: String,
    required: true,
    unique:true
  },
  business_email: {
    type: String,
    required: true,
    unique:true

  },
  phone: {
    type: Number,
    required: true,
    unique:true

  },
  website: {
    type: String,
    required: true,
    unique:true

  },
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
