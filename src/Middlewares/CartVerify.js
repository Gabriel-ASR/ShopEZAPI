const { Cart } = require("../Models/CartModel");
const { Product } = require("../Models/ProductModel");
const JWT = require("jsonwebtoken");

const missingVerify = async (req, res, next) => {
  const cart = new Cart({ ...req.body });
  let missingProd = [];
  let invalidProd = [];
  for (let i in cart.productList) {
    const currentProduct = await Product.findOne({
      name: cart.productList[i].name,
    });
    if (!currentProduct) {
      missingProd.push(cart.productList[i].name);
    }
    if (currentProduct) {
      if (
        currentProduct.name != cart.productList[i].name ||
        currentProduct.price != cart.productList[i].price ||
        currentProduct.desc != cart.productList[i].desc ||
        currentProduct.image_URL != cart.productList[i].image_URL ||
        currentProduct.createdBy != cart.productList[i].createdBy
      ) {
        invalidProd.push(cart.productList[i].name);
      }
    }
  }
  if (missingProd.length > 0 || invalidProd.length > 0) {
    res.status(422).json({
      Message: `Erro! Produtos inexistentes ou inválidos no carrinho. ${
        (missingProd, "\n", invalidProd)
      }`,
    });
  } else {
    next();
  }
};

const existingVerify = async (req, res, next) => {
  const cartOwner = JWT.verify(
    req.headers["authorization"],
    process.env.JWT_SECRET
  );
  const existingCart = await Cart.findOne({ ownedBy: cartOwner.id });
  if (existingCart) {
    res.status(409).send({ message: "Carrinho já existente!" });
  } else {
    next();
  }
};

module.exports = { missingVerify, existingVerify };
