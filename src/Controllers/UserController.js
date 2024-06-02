const mongoose = require("mongoose");
const { User } = require("../Models/UserModel");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");

const existingUserVer = async (req, res, next) => {
  const newUser = new User({ ...req.body });
  const existingUser = await User.findOne({ email: newUser.email });
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
  const user = await User.find();
  if (!user) {
    res.status(400).send({ Message: "Não há usuários!" });
  } else {
    res.send(user);
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
    res.status(400).json({ Message: "Id inválido." });
  }
};

const createNewUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(32).toString("hex");
    const encrypted = passwordEncrypt(req.body.password, salt);
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
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) {
      res.status(404).send({ Message: "Usuário inexistente!" });
    } else {
      let user;
      if (req.body.password) {
        const encrypted = passwordEncrypt(req.body.password, foundUser.salt);
        user = await User.findByIdAndUpdate(
          req.params.userId,
          { email: req.body.email, password: encrypted },
          { new: true }
        );
      } else {
        user = await User.findByIdAndUpdate(
          req.params.userId,
          { email: req.body.email },
          {
            new: true,
          }
        );
      }
      res.json({ user });
    }
  } catch (e) {
    res.status(400).json({ Message: "Id inválido." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId, {
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

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  existingUserVer,
  passwordEncrypt,
};
