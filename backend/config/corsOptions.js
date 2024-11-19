// CORS Configuration
var appearOrigins = [`http://localhost:${process.env.PORT}`, 'http://localhost:5500'];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || appearOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

module.exports = corsOptions;