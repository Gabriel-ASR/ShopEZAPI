const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");
const userController = require("../Controllers/UserController");

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.get("/:userId/produtos", productController.getUserProducts);

router.put("/:userId", userController.validateData, userController.updateUser);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
