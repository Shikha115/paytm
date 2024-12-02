// CORS Configuration
var appearOrigins = [
  `http://localhost:${process.env.PORT || 5500}`,
  "http://localhost:5173",
];

var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (!origin || appearOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
