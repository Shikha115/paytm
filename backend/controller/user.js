const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/Account");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  //validated in userValidate middleware

  const duplicate = await User.findOne({ username });
  if (duplicate) {
    return res.status(411).json({
      status: "failure",
      msg: "Email already taken/Incorrect inputs",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    username,
    password: hashPassword,
    firstName,
    lastName,
  });
  await user.save();

  // ====== random balance to user =======
  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 10000),
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  const userData = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  res.status(200).json({
    status: "success",
    msg: "User created successfully",
    token,
    data: userData,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //validated in userValidate middleware

  const user = await User.findOne({ username }).select(
    "-createdAt -updatedAt -__v"
  );
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!user || !isMatch) {
    return res.status(400).json({
      status: "failure",
      msg: "Invalid username or password",
    });
  }

  const userObj = user.toObject();
  delete userObj.password;

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  console.log("user._id", user._id);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded", decoded);

  res.status(200).json({
    status: "success",
    msg: "User login successfully",
    token,
    data: userObj,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { password, firstName, lastName } = req.body;

  //validated in userValidate middleware
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const user = await User.updateOne(
    { _id: req.userId },
    { $set: { password: hashPassword, firstName, lastName } }
  ).select("-createdAt -updatedAt -__v -password");

  if (user.matchedCount === 0 || user.modifiedCount === 0) {
    return res.status(400).json({
      status: "failure",
      msg: "User not found or no changes made",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "User updated successfully",
  });
});

const getAUser = asyncHandler(async (req, res) => {
  const user = await User.find(
    {
      _id: req.userId,
    },
    "-password -createdAt -updatedAt -__v"
  ); //or select

  if (!user) {
    return res.status(404).json({
      status: "failure",
      msg: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "User found successfully",
    data: user,
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const filter = req.query.filter || "";

  const regex = new RegExp(filter, "i"); //i = case insensitive

  const user = await User.find(
    {
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
      _id: { $ne: req.userId },
    },
    "-password -createdAt -updatedAt -__v"
  ); //or select

  if (!user || user.length === 0) {
    return res.status(404).json({
      status: "failure",
      msg: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    msg: "Users found successfully",
    data: user,
  });
});

module.exports = { registerUser, loginUser, updateUser, getAUser, getAllUser };
