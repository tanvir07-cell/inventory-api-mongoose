const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const http = require("http");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(process.env.DATABASE_LOCAL);
  console.log("Database connection is successfully established");
});

const server = http.createServer(app);

// server
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`App is running on port ${port}`.blue.bold);
});

// server file e amra sob connect kore rakhbo tai ei server file e amra listen kore diyechi
