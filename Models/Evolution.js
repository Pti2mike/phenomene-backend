const mongoose = require("mongoose");

const Evolution = mongoose.model("Evolution", {
  type: {
    type: String,
    require: true,
    default: "",
  },
  majorated: {
    type: String,
    require: true,
    default: "",
  },
  date: {
    type: Date,
    require: true,
    default: "",
  },
  douleur: {
    type: Number,
    require: true,
    default: 1,
  },
  mobility: {
    type: String,
    require: true,
    default: "",
  },
  checkUp: {
    type: String,
    require: true,
    default: "",
  },
  precision: {
    type: String,
    require: true,
    default: "",
  },
});

module.exports = Evolution;
