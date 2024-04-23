const userService = require("../services/userService");
const addWhatsapp = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({ status: "fail", message: "No data awailable" });
    }
    const data = req.body;
    const userId = req.params.userId;

    const {
      userID,
      expiresIn,
      accessToken,
      signedRequest,
      graphDomain,
      data_access_expiration_time,
      status,
    } = data;

    const newData = {
      status,
      userId,
      userID,
      expiresIn,
      accessToken,
      signedRequest,
      graphDomain,
      access_expiration_time: data_access_expiration_time,
    };

    const response = await userService.addWhatsAppService(newData);
    console.log(response);
    if (!response) {
      res
        .status(400)
        .json({ status: "fail", message: "failed to add whatsapp" });
    }
    res.status(200).json({
      status: "success",
      message: "created whatsapp account",
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const pendingAddWhatsapp = async (req, res) => {
  try {
    const { status, description, userId } = req.body;

    if (!status) return res.status(400).json({ message: "Status is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });

    const response = await userService.addPendingWhatsappStatus(req.body);

    if (response) {
      res.status(200).json({ message: "Status updated" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addWhatsapp,
  pendingAddWhatsapp,
};
