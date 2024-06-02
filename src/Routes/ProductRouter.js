const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");
const auth = require("../Middlewares/Auth");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post("/", auth.verifyToken, productController.CreateProduct);

router.put("/:productId", auth.verifyToken, productController.UpdateProduct);

router.delete("/:productId", auth.verifyToken, productController.DeleteProduct);

module.exports = router;
