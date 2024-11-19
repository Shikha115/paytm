require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const dbConnection = require("./config/dbConnection");
const { logger, errorLog } = require("./middlewares/loggers");
const app = express();


const port = process.env.PORT || 5500;

//db connection
dbConnection(process.env.DB_URL);

//middlewares
app.use(express.json());
app.use(cors(corsOptions)); 
app.use(logger);

//routes
app.use("/api/v1", require("./routes/index"));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.use(errorLog);

mongoose.connection.on("open", () => {
  console.log("Database connected");
  app.listen(port, (err) =>
    console.log(`Server is running on http://localhost:${port}`)
  );
});
mongoose.connection.on("error", (err) => {
  console.log("Database connection error", err);
});