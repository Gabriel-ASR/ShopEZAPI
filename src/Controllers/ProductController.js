const mongoose = require("mongoose");
const { Product } = require("../Models/ProductModel");
const JWT = require("jsonwebtoken");
const { User } = require("../Models/UserModel");

const getAllProducts = async (req, res) => {
  const Products = await Product.find();
  if (!Products) {
    res.status(404).send({ Message: "Não há produtos!" });
  } else {
    res.send(Products);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.productId);
    const product = await Product.findById(id);
    if (!product) {
      res
        .status(404)
        .send({ mensagem: "Não foi possível achar o produto especificado." });
    } else {
      res.send(product);
    }
  } catch (e) {
    res.status(400).json({ Message: `Formato de ID inválido.` });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userProduct = await Product.find({
      createdBy: req.params.userId,
    }).exec();
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).send({ Message: "Usuário não encontrado." });
    } else {
      if (!userProduct) {
        res.status(404).send({ Message: "Não há produtos para este usuário." });
      } else {
        res.status(200).send(userProduct);
      }
    }
  } catch (e) {
    res.status(400).json({ Message: "Id inválido" });
  }
};

const CreateProduct = async (req, res) => {
  const currentUser = JWT.verify(
    req.headers["authorization"],
    process.env.JWT_SECRET
  );
  try {
    const insertedProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image_URL: req.body.image_URL,
      createdBy: currentUser.id,
    });
    res.status(201).send(insertedProduct);
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos." });
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
    res.status(400).json({ Message: "Formato de dados ou id inválido." });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      res.status(404).send({ Message: "Produto não encontrado!" });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(400).json({ Message: "Formato de dados ou id inválido." });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  getUserProducts,
};
