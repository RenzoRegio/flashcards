const e = require("express");
const express = require("express");
const router = express.Router();
const { data } = require("../data/flashCardData.json");
const { cards } = data;
const num = Number;
router.get("/", (req, res) => {
  const id = Math.floor(Math.random() * cards.length + 1) - 1;
  res.redirect(`/cards/${id}?side=question`);
});
//
router.get(`/${num}`, (req, res) => {
  res.redirect(`/cards/${num}?`);
});

router.get("/:id", (req, res) => {
  const { side } = req.query;
  let oppositeSide = "";

  if (side === "question") {
    oppositeSide = "answer";
  } else if (side === "answer") {
    oppositeSide = "question";
  }

  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { text, hint, id, side, oppositeSide };
  res.render("card", templateData);
});

module.exports = router;
