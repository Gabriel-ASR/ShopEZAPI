const swaggerUI = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("yaml");
const express = require("express");
const path = require("path");

const file = fs.readFileSync(
  path.resolve(__dirname, "../swagger.yaml"),
  "utf-8"
);
const swaggerDoc = yaml.parse(file);

const router = express.Router();

router.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = router;
