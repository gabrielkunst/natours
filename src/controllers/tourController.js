const { rewriteFile } = require("../utils/helpers");
const fs = require("fs");

const toursJsonPath = `${__dirname}/../data/tours-simple.json`;
const toursAsJson = fs.readFileSync(toursJsonPath, {
  encoding: "utf-8",
});
const tours = JSON.parse(toursAsJson);

function getAllTours(req, res) {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
}

function createTour(req, res) {
  const newTourFromBody = req.body; // validated on middleware
  const newTourId = Math.floor(Math.random() * 1000000);
  const newTour = {
    id: newTourId,
    ...newTourFromBody,
  };

  tours.push(newTour);

  try {
    rewriteFile(tours, toursJsonPath);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Could not write tours to file",
    });
  }
}

function getTourById(req, res) {
  try {
    const id = req.params.id; // validated on middleware
    const tour = tours.find((tour) => tour.id === id);
    if (!tour) {
      res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Could not get tour",
    });
  }
}

function deleteTourById(req, res) {
  try {
    const id = req.params.id; // validated on middleware
    const tour = tours.find((tour) => tour.id === id);
    if (!tour) {
      res.status(400).json({
        status: "fail",
        message: "Tour not found",
      });
      return;
    }

    const toursWithoutDeletedOne = tours.filter((tour) => tour.id !== id);
    rewriteFile(toursWithoutDeletedOne, toursJsonPath);
    res.status(204);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Could not delete tour",
    });
  }
}

function validateId(req, res, next, value, name) {
  const id = Number(value);
  if (!id || isNaN(id)) {
    res.status(400).json({
      status: "fail",
      message: "Invalid id",
    });
    return;
  }
  req.params[name] = id;
  next();
}

function validateRequestBody(req, res, next) {
  const tourFromBody = req.body;

  if (!tourFromBody.name || !tourFromBody.price) {
    res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
    return;
  }

  next();
}

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  deleteTourById,
  validateId,
  validateRequestBody,
};
