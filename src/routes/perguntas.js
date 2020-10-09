const express = require("express");
const router = express.Router();

const modelPergunta = require("../database/models/Pergunta");

router.get("/", (req, res) => {
  modelPergunta
    .findAll({ raw: true, order: [["id", "desc"]] })
    .then((perguntas) => {
      // console.log(perguntas);
      res.render("index", {
        perguntas,
      });
    });
});

module.exports = router;