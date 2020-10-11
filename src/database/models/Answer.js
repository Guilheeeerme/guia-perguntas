const Sequelize = require("sequelize");
const connection = require("../database");

const Answer = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  // Uma forma simples/básica de fazer um relacionamento
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false });

module.exports = Answer;
