const mongoose = require("mongoose");
const { User } = require("../Models/UserModel");

const validateData = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.validate();
    next();
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.status(400).send({ Message: "Não há usuários!" });
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).send({ Message: "Usuário não encontrado!" });
    } else {
      res.json(user);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const createNewUser = async (req, res) => {
  const newUser = new User({ ...req.body });
  try {
    const existingUser = await User.findOne({ email: newUser.email });
    console.log(existingUser);
    if (existingUser) {
      res
        .status(409)
        .send({ Message: "Já existe um usuário com este e-mail!" });
    } else {
      const insertedUser = await newUser.save();
      res.status(201).json(insertedUser);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).send({ Message: "Usuário inexistente!" });
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId, { new: true });
    if (!user) {
      res.status(404).send({ Message: "Usuário inexistente!" });
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  validateData,
};
