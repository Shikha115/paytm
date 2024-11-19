const express = require("express");
const { registerUser, loginUser, updateUser, getAUser } = require("../controller/user");
const userValidate = require("../middlewares/userValidate");
const {
  userRegisterSchema,
  userLoginSchema,
  userId,
  userUpdateSchema,
} = require("../config/types");
const userAuth = require("../middlewares/userAuth");
const router = express.Router();

router.post("/signup", userValidate(userRegisterSchema), registerUser);
router.post("/signin", userValidate(userLoginSchema), loginUser);
router.put("/", userAuth, userValidate(userUpdateSchema), updateUser);
router.get("/bulk", getAUser);

module.exports = router;
