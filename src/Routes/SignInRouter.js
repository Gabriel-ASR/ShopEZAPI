const mongoose = require("mongoose");
const UserController = require("../Controllers/UserController");
const express = require("express");
const { User } = require("../Models/UserModel");

const router = express.Router();

router.post("/", UserController.existingUserVer, UserController.createNewUser);

module.exports = router;
