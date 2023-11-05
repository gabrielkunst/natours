const Tour = require("./../models/tourModel.js");

async function getAllTours(req, res) {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((element) => delete queryObj[element]);

    const queryStr = JSON.stringify(queryObj);
    const queryStrWith$ = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const newQueryParsed = JSON.parse(queryStrWith$);
    let query = Tour.find(newQueryParsed);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const tours = await query;

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

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

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

async function updateTourById(req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
}

async function deleteTourById(req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }

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
  updateTourById,
  deleteTourById,
};
