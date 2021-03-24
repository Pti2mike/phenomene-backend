const express = require("express");
const router = express.Router();

// import des models

const Form = require("../Models/Form");
const Evolution = require("../Models/Evolution");

// Create une Evolution

router.post("/add-evolution/:id", async (req, res) => {
  let idPhenomen = req.params.id;
  if (idPhenomen) {
    try {
      // Récupérer le form par son id
      const phenomen = await Form.findById(idPhenomen);
      // si le form existe
      if (phenomen) {
        let newEvolution = await new Evolution({
          apparation: req.fields.appartionDate,
          unchanged: req.fields.unchangedDate,
          title1: req.fields.title1,
          title2: req.fields.title2,
          aggravation: req.fields.aggravationDate,
          disappear: req.fields.disappearDate,
          title3: req.fields.title3,
          title4: req.fields.title4,
        });
        console.log(newEvolution);

        // Sauvegarde de la new evolution
        await newEvolution.save();

        // Ajout de newEvolution dans le form
        phenomen.evolutions.push(newEvolution);
        // Sauvegarde du form
        await phenomen.save();

        res.status(200).json({ resultat: newEvolution });
      } else {
        res.status(404).json({ error: "Phenomen not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Missing id param" });
  }
});

module.exports = router;
