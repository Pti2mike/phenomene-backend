const express = require("express");
const router = express.Router();

// import des models

const Form = require("../Models/Form");

// Create un Form

router.post("/add-form", async (req, res) => {
  // Ajouter un form
  try {
    let newForm = await new Form({
      pheno: req.fields.pheno,
      territoire: req.fields.territoire,
    });

    //console.log(newForm); ==> { _id: 60536da07d73d53738f0875a, pheno: 'hello', territoire: 'baba' }

    await newForm.save();

    res.status(200).json({ newForm });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET la liste des forms

router.get("/all-forms", async (req, res) => {
  try {
    const form = await Form.find();

    // Verification si un objet existe
    console.log(form);

    // Si oui
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE un form

router.delete("/delete-form/:id", async (req, res) => {
  // console.log("delete", req.params.id);

  try {
    const formToDelete = await Form.findById(req.params.id);
    console.log(formToDelete);

    await formToDelete.delete();

    res.status(200).json("Form has been deleted successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
