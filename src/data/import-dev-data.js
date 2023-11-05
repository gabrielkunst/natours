const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../config.env` });
const Tour = require("../models/tourModel");

console.log("DB IS ", process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log("Database connected");
});

const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8");

const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
