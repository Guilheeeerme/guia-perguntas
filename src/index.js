const express = require("express");
const app = express();

const connection = require("./database/database");
const modelPergunta = require("./database/models/Pergunta");

// Conexão MySQL
connection
  .autheticate()
  .then(() => {
    console.log("Conexão feita com o MySQL");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  modelPergunta
    .findAll({ raw: true, order: [["id", "desc"]] })
    .then((perguntas) => {
      // console.log(perguntas);
      res.render("index", {
        perguntas,
      });
    });
});

app.get("/salvarpergunta", (req, res) => {
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

app.get("/pergunta/:id", (req, res) => {
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

app.post("/responder", (req, res) => {
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected at http://localhost");
});
