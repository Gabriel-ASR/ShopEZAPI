const express = require("express");
const mongoose = require("mongoose");

const Produto = mongoose.model("Produto", {
  name: String,
  preco: Number,
  desc: String,
  image_URL: String,
});

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", async (req, res) => {
  const produtos = await Produto.find();
  res.send(produtos);
});

app.delete("/:id", async (req, res) => {
  const produto = await Produto.findByIdAndDelete(req.params.id);
  res.send(produto);
});

app.put("/:id", async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    preco: req.body.preco,
    desc: req.body.desc,
    image_URL: req.body.image_URL,
  });
  res.send("Tudo certo!");
});

app.post("/", async (req, res) => {
  const produto = new Produto({
    name: req.body.name,
    preco: req.body.preco,
    desc: req.body.desc,
    image_URL: req.body.image_URL,
  });

  await produto.save();
  res.send(produto);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://gabrielarocha:FLSPAXGabss123@shopezapi.qawhttl.mongodb.net/?retryWrites=true&w=majority&appName=ShopEZAPI"
  );
  console.log("App Running");
});
