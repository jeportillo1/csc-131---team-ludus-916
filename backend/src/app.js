// Main setup
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//* Require Routes *//
const nominationsRoutes = require("./routes/nominations");
const categoryRoute = require("./routes/category");
const entityRoute = require("./routes/entity");
const winnerRoute = require("./routes/winner");
const yearRoute = require("./routes/year");
//* Require Routes End *//

// middleweare
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// adjusting response with headers
// Ensure we don't get course error aka security measure
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next(); // move on
});

//* Routes *//
app.use("/nominations/category", categoryRoute);
app.use("/nominations/entity", entityRoute);
app.use("/nominations/winner", winnerRoute);
app.use("/nominations/year", yearRoute);
app.use("/nominations", nominationsRoutes);
//* Routes End *//

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Exporting to server.js
module.exports = app;
