const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");

router.post("/", authController.logIn);

module.exports = router;
