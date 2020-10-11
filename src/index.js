const express = require("express");
const app = express();
const connection = require("./database/database");

const routeQuestions = require("./routes/routerQuestions");

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

app.use(routeQuestions);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected at http://localhost");
});
