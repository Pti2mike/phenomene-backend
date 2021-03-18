const mongoose = require("mongoose");

const Form = mongoose.model("Form", { pheno: String, territoire: String });

module.exports = Form;
