const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const productController = require("../Controllers/ProductController");

router.get("/", productController.getAllProducts);

router.get("/:productId", productController.getProductById);

router.post("/", productController.CreateProduct);

router.put("/:productId", productController.UpdateProduct);

router.delete("/:productId", async (req, res) => {
  const produto = await Produto.findByIdAndDelete(req.params.id, {
    name: req.body.name,
    preco: req.body.preco,
    desc: req.body.desc,
    image_URL: req.body.image_URL,
  });
  res.send("Tudo certo!");
});

module.exports = router;
