const express = require("express");
const router = express.Router();

// import des models

const Form = require("../Models/Form");
const Evolution = require("../Models/Evolution");

// Create une Evolution

router.post("/add-evolution", async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
