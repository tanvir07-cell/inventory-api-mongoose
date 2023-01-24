const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRoute = require("./routes/products.route");

// const {
//   globalErrorHandler,
//   globalErrorStatus,
// } = require("./error/globalError.js");

app.use(express.json());
app.use(cors());

// for routes:
app.use("/api/v1/product", productRoute);

// for gloabl error handler:
// app.use(globalErrorStatus);
// app.use(globalErrorHandler);

// health route:
app.get("/health", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
