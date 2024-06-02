const { Cart } = require("../Models/CartModel");
const JWT = require("jsonwebtoken");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (!carts) {
      res.status(404).send({ Message: "Não há carrinhos registrados!" });
    } else {
      res.send(carts);
    }
  } catch (e) {
    res.status(500).send({ Message: e });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      res.status(404).send({ Message: "Carrinho não encontrado!" });
    } else {
      res.send(cart);
    }
  } catch (e) {
    res.status(500).send({ Message: e });
  }
};

const addNewCart = async (req, res) => {
  try {
    const cartOwner = JWT.verify(
      req.headers["authorization"],
      process.env.JWT_SECRET
    );
    const addedCart = await Cart.create({ ...req.body, ownedBy: cartOwner.id });
    res.status(201).send(addedCart);
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos!" });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cartId, req.body, {
      new: true,
    });
    res.send(cart);
  } catch (e) {
    res.status(500).send({ Message: e });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.cartId);
    if (!cart) {
      res.status(404).send({ Message: "Carrinho inexistente!" });
    } else {
      res.send(cart);
    }
  } catch (e) {
    res.status(500).send({ Message: e });
  }
};

module.exports = {
  addNewCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
};
