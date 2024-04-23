const Whatsapp = require("../models/whatsappModel");

const getAllWhatsappUsers = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

const getWhatsappUserById = async (token) => {
  try {
    const user = await Whatsapp.findOne({ verification_token: token });
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllWhatsappUsers,
  getWhatsappUserById,
};
