const mongoose = require("mongoose");

const Phenomenon = mongoose.model("Form", {
  pheno: String,
  territoire: String,
  majorated: String,
  date: Date,
  douleur: Number,
  mobility: String,
  checkUp: String,
  precision: String,
  evolutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evolution" }],
});

module.exports = Phenomenon;
