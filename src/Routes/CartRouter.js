const express = require("express");
const router = express.Router();
const CartController = require("../Controllers/CartController");

router.get("/", CartController.getAllCarts);

router.get("/:cartId", CartController.getCartById);

router.post("/", CartController.addNewCart);

router.put("/:cartId", CartController.validateData, CartController.updateCart);

router.delete("/:cartId", CartController.deleteCart);

module.exports = router;
