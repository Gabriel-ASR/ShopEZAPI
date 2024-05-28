const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image_URL: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
