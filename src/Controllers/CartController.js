const { Cart } = require("../Models/CartModel");
const { Product } = require("../Models/ProductModel");

const validateData = async (req, res, next) => {
  const cart = new Cart(req.body);
  try {
    await cart.validate();
    next();
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos." });
  }
};

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
    const cart = new Cart({ ...req.body });
    const existingCart = await Cart.findOne({ ownedBy: cart.ownedBy });
    if (existingCart) {
      res.status(409).send({ message: "Carrinho já existente!" });
    } else {
      let missingProd = [];
      for (let i in cart.productList) {
        const currentProduct = await Product.findOne({
          name: cart.productList[i].name,
        });
        if (!currentProduct) {
          missingProd.push(cart.productList[i].name);
          break;
        }
      }
      if (missingProd.length > 0) {
        res
          .status(422)
          .send({ message: `Erro! Produtos inexistentes: ${missingProd}` });
      } else {
        const addedCart = await cart.save();
        res.status(201).send(addedCart);
      }
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = Cart.findById(req.params.cartId);
    const cartRequestBd = req.body;
    if (!cart) {
      res.status(404).send({ Message: "Carrinho não encontrado!" });
    } else {
      let missingProd = [];
      for (let i in cartRequestBd.productList) {
        const currentProduct = await Product.findOne({
          name: cartRequestBd.productList[i].name,
        });
        if (!currentProduct) {
          missingProd.push(cartRequestBd.productList[i].name);
          break;
        }
      }
      if (missingProd.length > 0) {
        res
          .status(422)
          .send({ message: `Erro! Produtos inexistentes: ${missingProd}` });
      } else {
        const cart = await Cart.findByIdAndUpdate(req.params.cartId, req.body, {
          new: true,
        });
        res.send(cart);
      }
    }
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
  validateData,
};
