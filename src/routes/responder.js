const express = require("express");
const router = express.Router();

const modelResposta = require("../database/models/Resposta");

router.post("/responder", (req, res) => {
  const { corpo, perguntaId } = req.body;
  modelResposta
    .create({
      corpo,
      perguntaId,
    })
    .then(() => {
      res.redirect(`/pergunta/${perguntaId}`);
    });
});

module.exports = router;