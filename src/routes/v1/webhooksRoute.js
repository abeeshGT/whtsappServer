const express = require("express");

const messageController = require("../../controllers/messageController");
const router = express.Router();

router.get("/webhooks", messageController.verifyToken);
router.post("/webhooks", messageController.receiveWebhooks);

module.exports = router;
