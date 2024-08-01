const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const whatsappController = require("../../controllers/whatsappController");
const {
  signUpValidate,
  signUpValidationRules,
} = require("../../helpers/validations");

router.get("/", (req, res) => {
  res.send("User is available");
});
router.post(
  "/signup",
  signUpValidationRules,
  signUpValidate,
  userController.signUpUser
);

router.post("/signin", userController.signInUser);
router.post("/add_whatsapp/:userId", whatsappController.addWhatsapp);
router.post("/add_whatsapp/pending", whatsappController.pendingAddWhatsapp);
router.put("/add_url/:userId", userController.addUrl);
router.get("/all-whatsapp-users", userController.getAllWhatsappUsers);
router.post("/add-db",userController.addDatabaseConnection)
router.post("/connect-webhooks",whatsappController.addWebhooksUrl)

module.exports = router;
