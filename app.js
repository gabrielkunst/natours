const express = require('express');
const fs = require('fs');
const app = express();

const toursAsJson = fs.readFileSync(
  `${__dirname}/dev-data/data/tours-simple.json`,
  {
    encoding: 'utf-8',
  }
);
const tours = JSON.parse(toursAsJson);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
