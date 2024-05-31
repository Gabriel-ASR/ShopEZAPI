require("dotenv").config();

var express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const UsersRouter = require("./Routes/UsersRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ApiDocsRouter = require("./Routes/ApiDocsRouter");
const SignInRouter = require("./Routes/SignInRouter");
const CartRoute = require("./Routes/CartRouter");

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api-docs", ApiDocsRouter);

app.use("/usuarios", UsersRouter);

app.use("/produtos", ProductRouter);

app.use("/cadastrar", SignInRouter);

app.use("/carrinhos", CartRoute);

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGODB_CONNECT);
  console.log("App Running");
});
