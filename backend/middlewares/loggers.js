const path = require("path");
const fs = require("fs").promises;
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvent = async (file, msg) => {
  const filePath = path.join(__dirname, "..", "logs", file);
  const fileMsg = `${format(new Date(), "yyyy-MM-dd")}\t${uuid()}\t${msg}\n`;
  try {
    await fs.appendFile(filePath, fileMsg);
  } catch (err) {
    console.log(err);
  }
};

const logger = async (req, res, next) => {
  const msg = `${req.method}\t${req.url}\t${req.get("origin")}`;
  await logEvent("reqLog.log", msg);
  console.log(`reqLog = ${msg}`);
  next();
};

const errorLog = async (err, req, res, next) => {
  const msg = `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.get("origin")}`;
  await logEvent("errorLog.log", msg);

  res.status(500).json({  // Set the correct status code for server errors
    status: "failure",
    data: "msg from error middleware",
    message: err.message,
  });
  next();
};

module.exports = { logger, logEvent, errorLog };