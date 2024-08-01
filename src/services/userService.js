const PendingWhatsapp = require("../models/pendingWhatsappModel");
const User = require("../models/userModel");
const Whatsapp = require("../models/whatsappModel");

const userSignUpService = async (data) => {
   const response = await User.create(data);
   return response;
};

const userSignInService = async (email) => {
   return (response = await User.findOne({ business_email: email }));
};

const addWhatsAppService = async (data) => {
   return await Whatsapp.create(data);
};

const addPendingWhatsappStatus = async (data) => {
   return await PendingWhatsapp.create(data);
};

const urlUpdateService = async (userId, url) => {
   return await Whatsapp.findOneAndUpdate({ userId }, { app_url: url });
};

const getWhatsappUserService = async () => {
   return await Whatsapp.find().populate("userId");
};

const updateDatabaseDetails = async (userId, dbData) => {
   return await Whatsapp.findOneAndUpdate(
      { userId },
      { db_connection: dbData },
      { new: true }
   );
};

module.exports = {
   userSignUpService,
   userSignInService,
   addWhatsAppService,
   addPendingWhatsappStatus,
   urlUpdateService,
   getWhatsappUserService,
   updateDatabaseDetails,
};
