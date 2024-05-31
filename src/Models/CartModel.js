const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productList: [
    {
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
      createdBy: {
        type: String,
        required: true,
      },
    },
  ],
  ownedBy: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
