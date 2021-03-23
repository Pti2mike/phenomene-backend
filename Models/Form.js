const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  pheno: String,
  territoire: String,
  majoré: String,
  date: Date,
  douleur: String,
  mobility: String,
  checkUp: String,
  precision: String,
  evolutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evolution" }],
});

module.exports = Form;
