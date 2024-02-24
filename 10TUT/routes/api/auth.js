const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
router.post("/", registerController.handleNewUser);

module.exports = router;
