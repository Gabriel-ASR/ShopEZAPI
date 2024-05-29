const mongoose = require("mongoose");
const { User } = require("../Models/UserModel");

const getAllUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).send(user);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  try {
    if (!user) {
      res.status(404).json({ Message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ Message: "Erro interno do servidor." });
  }
};

const createNewUser = async (req, res) => {
  const newUser = new User({ ...req.body });
  const insertedUser = await newUser.save();

  try {
    res.status(201).json(insertedUser);
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getUserById,
};
