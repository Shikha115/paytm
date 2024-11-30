const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/account", require("./account"));
router.get("/*/", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

module.exports = router;
