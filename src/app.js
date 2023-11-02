const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("Using dev environment");
  app.use(morgan("dev"));
} else {
  console.log("Using production environment");
}

app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/user", userRouter);

module.exports = app;
