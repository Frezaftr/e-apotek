// controllers/userController.js
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User sudah terdaftar");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: 'user', // ⬅️ default role ketika register
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // ⬅️ kirim role juga
      token: generateToken(user), // ⬅️ kirim user object
    });
  } else {
    res.status(400);
    throw new Error("Data tidak valid");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // ⬅️ kirim role juga
      token: generateToken(user), // ⬅️ kirim user object
    });
  } else {
    res.status(401);
    throw new Error("Email atau password salah");
  }
});

export { registerUser, loginUser };
