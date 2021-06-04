const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middlewares/catchAsyncError");
//Registers a user => /api/v1/register
exports.registeUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatar/hghghghghghg",
      url: "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg",
    },
  });
  res.status(201).json({
    success: false,
    user,
  });
});
