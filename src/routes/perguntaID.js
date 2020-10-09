const express = require("express");
const router = express.Router();

const modelPergunta = require("../database/models/Pergunta");
const modelResposta = require("../database/models/Resposta");

router.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;
  modelPergunta
    .findOne({
      where: { id: id },
    })
    .then((pergunta) => {
      if (pergunta != undefined) {
        modelResposta
          .findAll({
            where: { perguntaId: pergunta.id }, // Relacionamento
            order: [["id", "DESC"]],
          })
          .then((respostas) => {
            res.render("pergunta", {
              pergunta,
              respostas,
            });
          });
      } else {
        res.redirect("/");
      }
    });
});

module.exports = router;