const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env` });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((connection) => {
  console.log("Database connected");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
