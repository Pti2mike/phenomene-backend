const express = require("express");
const router = express.Router();

// import des models

const Phenomenon = require("../Models/Phenomenon");
const Evolution = require("../Models/Evolution");

// Create un Phenomenon

router.post("/add-phenomenon", async (req, res) => {
  // Ajouter un Phenomenon
  try {
    let newPhenomenon = await new Phenomenon({
      pheno: req.fields.pheno,
      territoire: req.fields.territoire,
      majorated: req.fields.majore,
      date: req.fields.date,
      douleur: req.fields.douleur,
      mobility: req.fields.mobility,
      checkUp: req.fields.checkUp,
      precision: req.fields.precision,
    });

    await newPhenomenon.save();

    const phenomenon = await Phenomenon.find();

    res.status(200).json({ resultat: phenomenon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ la liste des Phenomenons

router.get("/all-phenomenons", async (req, res) => {
  try {
    const phenomenons = await Phenomenon.find().populate("evolutions");

    // Verification si un objet existe

    // Si oui
    res.status(200).json({ phenomenons });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE form

router.post("/update-evolution", async (req, res) => {
  try {
    const PhenomenonToUpdate = await Phenomenon.findById(req.fields.id);
    // console.log(formToUpdate);

    let evolutionToUpdate = await Evolution.findById(
      PhenomenonToUpdate.evolutions[0]
    );
    console.log(evolutionToUpdate);

    // si l'input est différent de null
    if (evolutionToUpdate.apparation === null) {
      // alors on récupère la valeur de req.fields.apparitionDate
      evolutionToUpdate.apparation = req.fields.apparitionDate;
    } else {
      // si non, la valeur reste inchangée même si tentative de modif
      evolutionToUpdate.apparation;
    }

    if (evolutionToUpdate.unchanged === null) {
      evolutionToUpdate.unchanged = req.fields.unchangedDate;
    } else {
      evolutionToUpdate.unchanged;
    }

    if (evolutionToUpdate.aggravation === null) {
      evolutionToUpdate.aggravation = req.fields.aggravationDate;
    } else {
      evolutionToUpdate.aggravation;
    }

    if (evolutionToUpdate.disappear === null) {
      evolutionToUpdate.disappear = req.fields.disappearedDate;
    } else {
      evolutionToUpdate.disappear;
    }

    if (evolutionToUpdate.title1 === "") {
      evolutionToUpdate.title1 = req.fields.title1;
    } else {
      evolutionToUpdate.title1;
    }

    if (evolutionToUpdate.title2 === "") {
      evolutionToUpdate.title2 = req.fields.title2;
    } else {
      evolutionToUpdate.title2;
    }

    if (evolutionToUpdate.title3 === "") {
      evolutionToUpdate.title3 = req.fields.title3;
    } else {
      evolutionToUpdate.title3;
    }

    if (evolutionToUpdate.title4 === "") {
      evolutionToUpdate.title4 = req.fields.title4;
    } else {
      evolutionToUpdate.title4;
    }

    await evolutionToUpdate.save();
    const phenomenon = await Phenomenon.find().populate("evolutions");

    res.status(200).json({ resultat: phenomenon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE un phenomenon

router.delete("/delete-phenomenon/:id", async (req, res) => {
  const phenomenonId = req.params.id;
  console.log("delete", phenomenonId);

  if (phenomenonId) {
    try {
      let phenomenonToDelete = await Phenomenon.findById(phenomenonId).populate(
        "evolutions"
      );

      console.log(phenomenonToDelete);

      // A REVOIR
      // si ...
      if (phenomenonToDelete) {
        await phenomenonToDelete.remove();

        await phenomenonToDelete.save();
      } else {
        res.status(400).json({ message: "Phénomène not found" });
      }

      res.status(200).json({ message: "Deleted", resultat: phenomenonId });
    } catch (error) {
      res.status(400).json({ message: "Erreur", error: error.message });
    }
  } else {
    res.status(400).json({ message: "Missing id param" });
  }
});

module.exports = router;
