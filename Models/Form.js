const mongoose = require("mongoose");

const Form = mongoose.model("Form", {
  pheno: String,
  territoire: String,
  evolution: { type: mongoose.Schema.Types.ObjectId, ref: "Evolution" },
});

module.exports = Form;
