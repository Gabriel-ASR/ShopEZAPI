const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.put("/:productId", productController.UpdateProduct);

router.post("/", productController.CreateProduct);

module.exports = router;
