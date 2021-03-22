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
      evolution: newEvolution._id,
    });

    //console.log(newForm); ==> { _id: 60536da07d73d53738f0875a, pheno: 'hello', territoire: 'baba' }

    await newForm.save();
    await newEvolution.save();
    const form = await Form.find().populate("evolution");

    res.status(200).json({ resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET la liste des forms

router.get("/all-forms", async (req, res) => {
  try {
    const form = await Form.find().populate("evolution");

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

    let evolutionToUpdate = await Evolution.findById(formToUpdate.evolution);
    // console.log(evolutionToUpdate);

    evolutionToUpdate.apparation = req.fields.appartionDate;
    evolutionToUpdate.unchanged = req.fields.unchangedDate;
    evolutionToUpdate.title1 = req.fields.title1;
    evolutionToUpdate.title2 = req.fields.title2;
    evolutionToUpdate.aggravation = req.fields.aggravationDate;
    evolutionToUpdate.disappear = req.fields.disappearedDate;
    evolutionToUpdate.title3 = req.fields.title3;
    evolutionToUpdate.title4 = req.fields.title4;

    await evolutionToUpdate.save();
    const form = await Form.find().populate("evolution");

    res.status(200).json({ resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE un form

router.post("/delete-form", async (req, res) => {
  console.log("delete", req.fields.id);

  try {
    const formToDelete = await Form.findById(req.fields.id);
    const evolutionToDelete = await Evolution.findById(formToDelete.evolution);

    await evolutionToDelete.delete();
    await formToDelete.delete();
    const form = await Form.find().populate("evolution");

    res.status(200).json({ message: "Deleted", resultat: form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
