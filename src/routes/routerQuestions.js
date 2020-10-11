const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controller");

router.get("/", Controller.findAllQuestions);
router.get("/pergunta/:id", Controller.getByID);
router.get("/perguntar", (req, res) => { res.render("perguntar"); });
router.post("/salvarpergunta", Controller.saveQuestion);
router.post("/responder", Controller.answer);

module.exports = router;
