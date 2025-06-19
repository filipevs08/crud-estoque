const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(cors());
app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Erro interno do servidor");
});

module.exports = app;
