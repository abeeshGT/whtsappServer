const express = require("express");

const messageController = require("../../controllers/messageController");
const router = express.Router();

router.post("/receive", messageController.receiveMessage);
router.post("/verify_token", messageController.verifyToken);

module.exports = router;
