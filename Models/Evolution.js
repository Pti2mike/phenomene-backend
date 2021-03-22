const mongoose = require("mongoose");

const Evolution = mongoose.model("Evolution", {
  apparation: {
    type: Date,
    require: true,
    default: "",
  },
  unchanged: {
    type: Date,
    require: true,
    default: "",
  },
  title1: { type: String, require: true, default: "" },
  title2: { type: String, require: true, default: "" },
  aggravation: {
    type: Date,
    require: true,
    default: "",
  },
  disappear: {
    type: Date,
    require: true,
    default: "",
  },
  title3: { type: String, require: true, default: "" },
  title4: { type: String, require: true, default: "" },
});

module.exports = Evolution;
