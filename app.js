const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Spotify Auth App");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
