const express = require("express");
const app = express();
const Tour = require("./handlers/tour");

app.use(express.json());

app.route("/api/v1/tours").get(Tour.getAllTours).post(Tour.createTour);
app
  .route("/api/v1/tours/:id")
  .get(Tour.getTourById)
  .delete(Tour.deleteTourById);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
