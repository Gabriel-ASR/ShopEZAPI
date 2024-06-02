require("dotenv").config();

var express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const UsersRouter = require("./Routes/UsersRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ApiDocsRouter = require("./Routes/ApiDocsRouter");
const SignInRouter = require("./Routes/SignInRouter");
const CartRouter = require("./Routes/CartRouter");
const LogInRouter = require("./Routes/logInRouter");
const RefreshRouter = require("./Routes/RefreshRouter");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api-docs", ApiDocsRouter);

app.use("/usuarios", UsersRouter);

app.use("/produtos", ProductRouter);

app.use("/cadastrar", SignInRouter);

app.use("/carrinhos", CartRouter);

app.use("/login", LogInRouter);

app.use("/renovar", RefreshRouter);

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_CONNECT);
  console.log(`Conectado na porta ${process.env.PORT}, aplicativo rodando.`);
});

module.exports = app;
