// external imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// internal imports
const router = require("./src/routes/api");

const app = express();
app.use(cors());

// parse json request body
app.use(express.json({ limit: "1mb" }));

// mongodb Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected!"))
  .catch((err) => {
    console.log("err");
  });

// v1 api routes
app.use("/api/", router);

// handle invalid routes
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});
module.exports = app;
