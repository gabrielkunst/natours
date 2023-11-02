const express = require("express");
const app = express();
const Tour = require("./handlers/tour");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/tours", tourRouter);

const tourRouter = express.Router();
tourRouter.route("/").get(Tour.getAllTours).post(Tour.createTour);
tourRouter.route("/:id").get(Tour.getTourById).delete(Tour.deleteTourById);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
