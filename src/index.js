const express = require("express");
const app = express();
const connection = require("./database/database");

const rotaPerguntas = require("./routes/perguntas");
const rotaPerguntar = require("./routes/perguntar");
const rotaPerguntaID = require("./routes/perguntaID");
const rotaResponder = require("./routes/responder");

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

app.use("/", rotaPerguntas);
app.use("/", rotaPerguntar);
app.use("/", rotaPerguntaID);
app.use("/", rotaResponder);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected at http://localhost");
});
