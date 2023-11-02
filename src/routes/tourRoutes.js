const express = require("express");
const tourController = require("../controllers/tourController");
const router = express.Router();

router.param("id", tourController.validateId);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.validateRequestBody, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTourById)
  .delete(tourController.deleteTourById);

module.exports = router;
