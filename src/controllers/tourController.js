const Tour = require("./../models/tourModel.js");

async function getAllTours(req, res) {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
}

async function createTour(req, res) {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
}

async function getTourById(req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
}

async function deleteTourById(req, res) {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
}

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  deleteTourById,
};
