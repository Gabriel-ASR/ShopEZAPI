const mongoose = require("mongoose");
const { Product } = require("../Models/ProductModel");

const getAllProducts = async (req, res) => {
  const Products = await Product.find();
  res.send(Products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res
      .status(404)
      .json({ mensagem: "Não foi possível achar o produto especificado." });
    console.log(req.params.productId);
  } else {
    console.log(req.params.productId);
    console.log(product);
    res.send(product);
  }
};

const CreateProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });
  const insertedProduct = await newProduct.save();
  res.status(201).send(insertedProduct);
};

const UpdateProduct = async (req, res) => {
  try {
    const id = req.params.productId;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o produto." });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;

    const product = await Product.findByIdAndDelete(id, {
      name: req.body.name,
      preco: req.body.preco,
      desc: req.body.desc,
      image_URL: req.body.image_URL,
      createdBy: req.body.createdBy,
    });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro ao deletar o produto." });
  }
};

const getUserProducts = async (req, res) => {
  const userProduct = await Product.find({
    createdBy: req.params.userId,
  }).exec();
  res.status(200).send(userProduct);
};

module.exports = {
  getAllProducts,
  getProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  getUserProducts,
};
