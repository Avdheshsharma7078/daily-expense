const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api", userRoutes);
app.use("/api", expenseRoutes);

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
