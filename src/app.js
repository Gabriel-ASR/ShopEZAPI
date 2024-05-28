const express = require("express");
const mongoose = require("mongoose");
const editRoute = require("./Routes/EditRoute");
const JWT = require("jsonwebtoken");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const fs = require("fs");
const FavRoute = require("./Routes/FavRoute");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3000;

// iniciando o arquivo da documentação e atrelando-o à rota /api-doc
const file = fs.readFileSync(
  path.resolve(__dirname, "./swagger.yaml"),
  "utf-8"
);
const swaggerDocs = YAML.parse(file);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/editar-produto", editRoute);

app.get("/", (req, res) => {
  res.send("<h1>Olá!</h1>");
});

app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_CONNECT);
  console.log("App Running");
});
