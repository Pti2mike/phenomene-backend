const express = require("express");
const router = express.Router();

// import des models

const Phenomenon = require("../Models/Phenomenon");
const Evolution = require("../Models/Evolution");

// Create une Evolution

router.post("/add-evolution/:id", async (req, res) => {
  let idPhenomen = req.params.id;
  if (idPhenomen) {
    try {
      // Récupérer le form par son id
      const phenomen = await Phenomenon.findById(idPhenomen);
      // si le form existe
      if (phenomen) {
        let newEvolution = await new Evolution({
          name: req.fields.name,
          majorated: req.fields.majorated,
          date: req.fields.date,
          douleur: req.fields.douleur,
          mobility: req.fields.mobility,
          checkUp: req.fields.checkUp,
          precision: req.fields.precision,
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

// UPDATE une evolution

router.put(
  "/phenomenon/:idPhenomenon/update-evolution/:idEvolution",
  async (req, res) => {
    // console.log(`update ${req.params.idPhenomenon} ${req.params.idEvolution} `);

    let { idPhenomenon, idEvolution } = req.params;

    if (idPhenomenon && idEvolution) {
      try {
        // Récupère le phenomenon suivant son id
        let phenomenonToUpdate = await Phenomenon.findById(idPhenomenon);

        // Récupère l'evolution suivant son id
        let evolutionToUpdate = await Evolution.findById(idEvolution);

        if (phenomenonToUpdate && evolutionToUpdate) {
          if (req.fields.evolType) {
            evolutionToUpdate.name = req.fields.evolType;
          }
          if (req.fields.evolMajorated) {
            evolutionToUpdate.majorated = req.fields.evolMajorated;
          }
          if (req.fields.evolDate) {
            evolutionToUpdate.date = req.fields.evolDate;
          }
          if (req.fields.evolDouleur) {
            evolutionToUpdate.douleur = req.fields.evolDouleur;
          }
          if (req.fields.evolMobility) {
            evolutionToUpdate.mobility = req.fields.evolMobility;
          }
          if (req.fields.evolCheckUp) {
            evolutionToUpdate.checkUp = req.fields.evolCheckUp;
          }
          if (req.fields.evolPrecision) {
            evolutionToUpdate.precision = req.fields.evolPrecision;
          }
        }
        // console.log(`evolutionToUpdate ${evolutionToUpdate}`);

        await evolutionToUpdate.save();

        res.status(200).json({ resultat: evolutionToUpdate });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Missing id param" });
    }
  }
);

// Suppression d'une evolution

router.delete(
  "/phenomenon/:idPhenomemon/delete-evolution/:idEvolution",
  async (req, res) => {
    // console.log(
    //   `response ${req.params.idPhenomemon} ${req.params.idEvolution}`
    // );

    let { idPhenomemon, idEvolution } = req.params;

    if (idPhenomemon && idEvolution) {
      try {
        // Récupère le phenomenon suivant son id
        let phenomenon = await Phenomenon.findById(idPhenomemon);

        // Récupère l'evolution suivant son id
        let evolution = await Evolution.findById(idEvolution);

        // console.log(`Phenomenon --> ${phenomenon}`);
        // console.log(`Evolution --> ${evolution}`);

        if (phenomenon && evolution) {
          // pull() method is used to remove an element from collection by given key and return the pulled element
          await phenomenon.evolutions.pull({ _id: idEvolution });
          // Sauvegarde du tableau
          await phenomenon.save();
          // Mise à jour de la DB Evolution en supprimant l'evolution
          await Evolution.findOneAndDelete({ _id: idEvolution });

          res.status(200).json({ message: "Deleted", resultat: phenomenon });
        } else {
          res.status(404).json({ error: "Not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error });
      }
    } else {
      res.status(400).json({ error: "Missing id param" });
    }
  }
);

module.exports = router;
