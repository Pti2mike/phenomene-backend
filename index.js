const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const mongoose = require("mongoose");

// Create Database

mongoose.connect("mongodb://localhost/test-phenomenes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import des routes

const formRoute = require("./Routes/Form");
app.use(formRoute);

app.get("/", (req, res) => {
  res.json({ message: "Bonjour Phénomènes" });
});

app.listen(3000, () => {
  console.log("Server started");
});
