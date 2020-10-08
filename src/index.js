const express = require("express");
const app = express();

const connection = require("./database/database");

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected at http://localhost");
});
