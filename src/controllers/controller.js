const modelPergunta = require("../database/models/Pergunta");
const modelResposta = require("../database/models/Resposta");

exports.getByID = (req, res) => {
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
};

exports.postSalvarPergunta = (req, res) => {
  const { titulo, descricao } = req.body;
  modelPergunta
    .create({
      titulo,
      descricao,
    })
    .then(() => {
      res.redirect("/");
    });
};

exports.findAllPerguntas = (req, res) => {
  modelPergunta
    .findAll({ raw: true, order: [["id", "desc"]] })
    .then((perguntas) => {
      // console.log(perguntas);
      res.render("index", {
        perguntas,
      });
    });
};

exports.postResposta = (req, res) => {
  const { corpo, perguntaId } = req.body;
  modelResposta
    .create({
      corpo,
      perguntaId,
    })
    .then(() => {
      res.redirect(`/pergunta/${perguntaId}`);
    });
};