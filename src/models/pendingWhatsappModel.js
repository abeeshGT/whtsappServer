const mongoose = require("mongoose");
const User = require("./userModel");

const pendingWhatsappModel = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  ],
  status: {
    type: String,
    required: [true, "Status is not awailable"],
  },
  description: {
    type: String,
    trim: true,
  },
});

const PendingWhatsapp = mongoose.model("PendingWhatsapp", pendingWhatsappModel);
module.exports = PendingWhatsapp;
