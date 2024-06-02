const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const token = req.headers["authorization"];
      JWT.verify(token, process.env.JWT_SECRET);
      next();
    } catch (e) {
      res.status(401).json({ Message: "Token inválido!" });
    }
  } else {
    console.log(req.headers["authorization"]);
    res.status(400).json({ Message: "Token inválido ou ausente." });
  }
};

module.exports = { verifyToken };
