const asyncHandler = require("express-async-handler");
const Account = require("../models/Account");
const mongoose  = require("mongoose");

const getUserBalance = asyncHandler(async (req, res) => {
  const account = await Account.findOne({userId : req.userId}).select(
    "-createdAt -updatedAt -__v"
  );
  console.log("req.userId", req.userId)
  if (!account) {
    return res.status(404).json({
      status: "failure",
      msg: "Account not found",
      userId: req.userId,
    });
  }

  res.status(200).json({ status: "success", data: account });
});

const transfer = asyncHandler(async (req, res) => {
  // https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a

  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, receiverId } = req.body;

  const sender = await Account.findOne({ userId: req.userId })
    .select("-createdAt -updatedAt -__v")
    .session(session);
  console.log("sender", sender,req.userId )
  if (!sender || sender.balance < amount) {
    await session.abortTransaction();
    return res.status(404).json({
      status: "failure",
      msg: `Sender Account not found or insufficient balance ${sender?.balance}`,
    });
  }

  const receiver = await Account.findOne({ userId: receiverId }).select(
    "-createdAt -updatedAt -__v"
  );

  if (!receiver) {
    await session.abortTransaction();
    return res
      .status(404)
      .json({ status: "failure", msg: "Receiver Account not found" });
  }

  //update balance
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: receiverId },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  console.log("Transfer done")

  res.status(200).json({
    status: "success",
    msg: "Transfer successful",
    data: { sender: sender.balance, receiver: receiver.balance },
  });
});

module.exports = { getUserBalance, transfer };
