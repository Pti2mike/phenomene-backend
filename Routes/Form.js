const express = require("express");
const router = express.Router();

// import des models

const Form = require("../Models/Form");
const Evolution = require("../Models/Evolution");

// Create un Form

router.post("/add-form", async (req, res) => {
  // Ajouter un form
  try {
    let newEvolution = await new Evolution();

    let newForm = await new Form({
      pheno: req.fields.pheno,
      territoire: req.fields.territoire,
      majoré: req.fields.majoré,
      date: req.fields.date,
      douleur: req.fields.douleur,
      mobility: req.fields.mobility,
      checkUp: req.fields.checkUp,
      precision: req.fields.precision,
      evolutions: [newEvolution._id],
    });

    await newForm.save();
    await newEvolution.save();
    const form = await Form.find().populate("evolutions");

    res.status(200).json({ resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET la liste des forms

router.get("/all-forms", async (req, res) => {
  try {
    const form = await Form.find().populate("evolutions");

    // Verification si un objet existe

    // Si oui
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE form

router.post("/update-evolution", async (req, res) => {
  try {
    const formToUpdate = await Form.findById(req.fields.id);
    // console.log(formToUpdate);

    let evolutionToUpdate = await Evolution.findById(
      formToUpdate.evolutions[0]
    );
    console.log(evolutionToUpdate);

    // si l'input est différent de null
    if (evolutionToUpdate.apparation === null) {
      // alors on récupère la valeur de req.fields.appartionDate
      evolutionToUpdate.apparation = req.fields.appartionDate;
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

    // evolutionToUpdate.apparation = req.fields.appartionDate;
    // evolutionToUpdate.unchanged = req.fields.unchangedDate;
    // evolutionToUpdate.title1 = req.fields.title1;
    // evolutionToUpdate.title2 = req.fields.title2;
    // evolutionToUpdate.aggravation = req.fields.aggravationDate;
    // evolutionToUpdate.disappear = req.fields.disappearedDate;
    // evolutionToUpdate.title3 = req.fields.title3;
    // evolutionToUpdate.title4 = req.fields.title4;

    await evolutionToUpdate.save();
    const form = await Form.find().populate("evolutions");

    res.status(200).json({ resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE un form

router.post("/delete-form", async (req, res) => {
  console.log("delete", req.fields.id);

  try {
    const evolutionsToDelete = [];
    const formToDelete = await Form.findById(req.fields.id);
    for (i = 0; i < formToDelete.evolutions.length; i++) {
      evolutionToDelete = await Evolution.findById(formToDelete.evolutions[i]);
      evolutionsToDelete.push(evolutionToDelete);
    }

    for (i = 0; i < evolutionsToDelete.length; i++)
      await evolutionsToDelete[i].delete();
    await formToDelete.delete();
    const form = await Form.find().populate("evolutions");

    res.status(200).json({ message: "Deleted", resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
