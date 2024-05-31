const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post(
  "/",
  productController.validateData,
  productController.CreateProduct
);

router.put(
  "/:productId",
  productController.validateData,
  productController.UpdateProduct
);

router.delete("/:productId", productController.DeleteProduct);

module.exports = router;
