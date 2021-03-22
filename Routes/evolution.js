const express = require("express");
const router = express.Router();

// import des models

const Form = require("../Models/Form");
const Evolution = require("../Models/Evolution");

// Create une Evolution

router.post("/add-evolution", async (req, res) => {
  try {
    let newEvolution = await new Evolution({
      apparation: req.fields.apparation,
      unchanged: req.fields.unchanged,
      title1: req.fields.title1,
      title2: req.fields.title2,
      aggravation: req.fields.aggravation,
      disappear: req.fields.disappear,
      title3: req.fields.title3,
      title4: req.fields.title4,
    });
    console.log(newEvolution);

    await newEvolution.save();

    res.status(200).json({ resultat: newEvolution });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
