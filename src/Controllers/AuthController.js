const JWT = require("jsonwebtoken");
const { User } = require("../Models/UserModel");
const { passwordEncrypt } = require("../Controllers/UserController");

const logIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const encrypted = passwordEncrypt(req.body.password, user.salt);
    if (user.password === encrypted) {
      res.json({
        token: JWT.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "2m" }
        ),
      });
    } else {
      res.status(401).json({ Message: "Acesso negado." });
    }
  } else {
    res.status(400).json({ Message: "Credenciais inválidas." });
  }
};

const refreshToken = (req, res) => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET, {
        ignoreExpiration: true,
      });
      console.log(payload);
      res.json({
        token: JWT.sign(
          { email: payload.email, id: payload.id },
          process.env.JWT_SECRET,
          { expiresIn: "2m" }
        ),
      });
    } catch (e) {
      res.status(401).json({ Message: "Token inválido!" });
    }
  } else {
    res.status(400).json({ Message: "Token ausente." });
  }
};

module.exports = {
  logIn,
  refreshToken,
};
