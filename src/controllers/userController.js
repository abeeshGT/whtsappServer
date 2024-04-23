const bcrypt = require("bcryptjs");
const {
  userSignUpService,
  userSignInService,
  urlUpdateService,
  getWhatsappUserService,
} = require("../services/userService");

const signUpUser = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  req.body.password = hashedPassword;
  const response = await userSignUpService(req.body);

  res.status(200).json({ status: "success", response });
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(401)
        .json({ status: "fail", message: "Email and password is required" });
    }

    const userDetails = await userSignInService(email);
    console.log({ userDetails });
    console.log(password, userDetails.password);
    const isPasswordMatch = await bcrypt.compare(
      password,
      userDetails.password
    );
    console.log({ isPasswordMatch });

    if (!userDetails || !isPasswordMatch)
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });

    res.status(200).json({ status: "success", user: userDetails });
  } catch (err) {
    console.log(err);
  }
};

const addUrl = async (req, res) => {
  const { url } = req.body;
  const userId = req.params.userId;
  console.log({ url, userId });

  const response = await urlUpdateService(userId, url);
  console.log(response);

  if (!response)
    return res
      .status(400)
      .json({ status: "failed", message: "Failed to update url" });

  res.status(200).json({ status: "success" });
};

const getAllWhatsappUsers = async (req, res) => {
  const users = await getWhatsappUserService();
  if (!users) return res.status(401).json({ message: "No users found" });
  res.status(200).json({ status: "success", users });
};

module.exports = {
  signUpUser,
  signInUser,
  addUrl,
  getAllWhatsappUsers,
};
