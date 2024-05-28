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
      .send({ mensagem: "Não foi possível achar o produto especificado." });
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
  res
    .status(201)
    .send({ mensagem: "Criado com sucesso.", Objeto: insertedProduct });
};

const UpdateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body
  );
  console.log(product + "\n" + req.params.productId);
  res.send(product);
};
const DeleteProduct = async (req, res) => {};

module.exports = {
  getAllProducts,
  getProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
