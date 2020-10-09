const express = require("express");
const app = express();
const connection = require("./database/database");

const rotaPerguntas = require("./routes/routerPerguntas");

// Conexão MySQL
connection
  .authenticate()
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

app.use(rotaPerguntas);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected at http://localhost");
});
