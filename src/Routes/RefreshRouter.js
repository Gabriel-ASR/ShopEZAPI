const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

router.get("/", authController.refreshToken);

module.exports = router;
