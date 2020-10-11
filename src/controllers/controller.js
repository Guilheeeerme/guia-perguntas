const modelQuestion = require("../database/models/Question");
const modelAnswer = require("../database/models/Answer");

exports.getByID = (req, res) => {
  const id = req.params.id;
  modelQuestion
    .findOne({
      where: { id: id },
    })
    .then((pergunta) => {
      if (pergunta != undefined) {
        modelAnswer
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

exports.saveQuestion = (req, res) => {
  const { titulo, descricao } = req.body;
  modelQuestion
    .create({
      titulo,
      descricao,
    })
    .then(() => {
      res.redirect("/");
    });
};

exports.findAllQuestions = (req, res) => {
  modelQuestion
    .findAll({ raw: true, order: [["id", "desc"]] })
    .then((perguntas) => {
      // console.log(perguntas);
      res.render("index", {
        perguntas,
      });
    });
};

exports.answer = (req, res) => {
  const { corpo, perguntaId } = req.body;
  modelAnswer
    .create({
      corpo,
      perguntaId,
    })
    .then(() => {
      res.redirect(`/pergunta/${perguntaId}`);
    });
};