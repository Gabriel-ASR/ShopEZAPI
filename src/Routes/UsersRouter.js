const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");
const userController = require("../Controllers/UserController");
const auth = require("../Middlewares/Auth");

router.get("/", auth.verifyToken, userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.get("/:userId/produtos", productController.getUserProducts);

router.put(
  "/:userId",
  auth.verifyToken,
  userController.existingUserVer,
  userController.updateUser
);

router.delete("/:userId", auth.verifyToken, userController.deleteUser);

module.exports = router;
