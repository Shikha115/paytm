const express = require("express");
const { getUserBalance, transfer } = require("../controller/account");
const userAuth = require("../middlewares/userAuth");
const router = express.Router();

router.get("/balance", userAuth, getUserBalance);
router.get("/transfer", userAuth, transfer);

module.exports = router;
