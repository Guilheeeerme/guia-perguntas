const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controller");

router.get("/", Controller.findAllPerguntas);
router.get("/pergunta/:id", Controller.getByID);

router.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
router.post("/salvarpergunta", Controller.postSalvarPergunta);

router.post("/responder", Controller.postResposta);

module.exports = router;