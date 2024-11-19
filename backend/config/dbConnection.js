const mongoose = require("mongoose");

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    // console.log("Connected to the database");
  } catch (err) {
    console.log(`Couldn't connect to the database: ${err}`);
  }
};

module.exports = dbConnection;


