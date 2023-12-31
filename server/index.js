const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { connectDatabase } = require("./connection");

const apiRoute = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 7000;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/static", express.static("public"));

connectDatabase(process.env.DATABASE_URL).then(() =>
  console.log("MongoDb Connected!")
);

app.use("/api/v1", apiRoute);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
