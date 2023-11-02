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
const tours = JSON.parse(toursAsJson);

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
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
