const mongoose = require("mongoose");
const UserController = require("../Controllers/UserController");
const express = require("express");

const router = express.Router();

router.post("/", UserController.createNewUser);

module.exports = router;
