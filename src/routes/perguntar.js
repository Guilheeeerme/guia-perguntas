const express = require("express");
const router = express.Router();

const modelPergunta = require("../database/models/Pergunta");

router.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

router.get("/salvarpergunta", (req, res) => {
  const { titulo, descricao } = req.body;
  modelPergunta
    .create({
      titulo,
      descricao,
    })
    .then(() => {
      res.redirect("/");
    });
});

module.exports = router;