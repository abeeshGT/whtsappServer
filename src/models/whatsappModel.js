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
   chat_boat_url: {
      type: String,
   },
   mobile_app_url: {
      type: String,
   },
   db_connection: {
      userName: { type: String },
      password: { type: String },
      connection_string: { type: String },
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
   phone_number_id: {
      type: String,
      required: true,
   },
   waba_id: {
      type: String,
      required: true,
   },
   type: {
      type: String,
   },
   event: {
      type: String,
   },
   version: {
      type: String,
   },
});

const Whatsapp = mongoose.model("Whatsapp", whtsappSchema);
module.exports = Whatsapp;
