const Tour = require("./../models/tourModel");
const errorController = require("./errorController");
const CustomError = require("../models/errorModel");

const getAllTours = errorController.handleAsyncError(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

const createTour = errorController.handleAsyncError(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

const getTourById = errorController.handleAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  if (!tour) {
    const err = new CustomError(`No tour found with ID ${id}`, 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

const updateTourById = errorController.handleAsyncError(async (req, res) => {
  const id = req.params.id;

  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    const err = new CustomError(`No tour found with ID ${id}`, 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

const deleteTourById = errorController.handleAsyncError(async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndDelete(id);

  if (!tour) {
    const err = new CustomError(`No tour found with ID ${id}`, 404);
    return next(err);
  }

  res.status(204);
});

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
};
