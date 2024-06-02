const mongoose = require("mongoose");
const { User } = require("../Models/UserModel");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");

const validateData = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.validate();
    next();
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos." });
  }
};

const existingUserVer = async (req, res, next) => {
  const newUser = new User({ ...req.body });
  const existingUser = await User.findOne({ email: newUser.email });
  console.log(existingUser);
  try {
    if (existingUser) {
      res
        .status(409)
        .send({ Message: "Já existe um usuário com este e-mail!" });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ Message: e });
  }
};

const passwordEncrypt = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
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
  const salt = crypto.randomBytes(32).toString("hex");
  const encrypted = passwordEncrypt(req.body.password, salt);
  try {
    const insertedUser = await User.create({
      email: req.body.email,
      password: encrypted,
      salt: salt,
    });
    res.status(201).json(insertedUser);
  } catch (e) {
    res.status(422).json({ Message: "Dados inválidos!" });
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
  existingUserVer,
  passwordEncrypt,
};
