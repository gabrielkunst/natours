const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const toursAsJson = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  {
    encoding: 'utf-8',
  }
);
let tours = JSON.parse(toursAsJson);

function rewriteTours(data, callback) {
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(data),
    () => callback()
  );
}

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours.at(-1).id + 1;

  const newTour = {
    id: newId,
    ...req.body,
  };

  tours.push(newTour);
  rewriteTours(tours, () => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);

  if (id === undefined || isNaN(id)) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }

  const toursWithoutDeleted = tours.filter((tour) => tour.id !== id);
  rewriteTours(toursWithoutDeleted, () => {
    res.status(200).json({
      status: 'success',
      message: 'Tour deleted successfully',
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
