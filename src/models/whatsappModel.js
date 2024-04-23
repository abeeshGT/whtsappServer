const mongoose = require("mongoose");
const User = require("./userModel");

const whtsappSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  accessToken: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Number,
    required: true,
  },
  signedRequest: {
    type: String,
    required: true,
  },
  graphDomain: {
    type: String,
    required: true,
  },
  access_expiration_time: {
    type: Number,
    required: true,
  },
  app_url: {
    type: String,
  },
  verification_token: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Whatsapp = mongoose.model("Whatsapp", whtsappSchema);
module.exports = Whatsapp;
