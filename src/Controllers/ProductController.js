const mongoose = require("mongoose");
const { Product } = require("../Models/ProductModel");

const validateData = async (req, res, next) => {
  const product = new Product({ ...req.body });
  try {
    await product.validate();
    next();
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos." });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const Products = await Product.find();
    if (!Products) {
      res.status(404).send({ Message: "Não há produtos!" });
    } else {
      res.send(Products);
    }
  } catch (e) {
    res.status(500).send({ Message: e });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res
        .status(404)
        .send({ mensagem: "Não foi possível achar o produto especificado." });
    } else {
      res.send(product);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userProduct = await Product.find({
      createdBy: req.params.userId,
    }).exec();

    if (!userProduct) {
      res.status(404).send({ Message: "Não há produtos para este usuário." });
    } else {
      res.status(200).send(userProduct);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const CreateProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });
    const insertedProduct = await newProduct.save();
    res.status(201).send(insertedProduct);
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).send({ Message: "Produto não encontrado." });
    } else {
      res.send(product);
    }
  } catch (e) {
    console.error(error);
    res.status(500).json({ Message: e });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      res.status(404).send({ Message: "Produto não encontrado" });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  getUserProducts,
  validateData,
};
