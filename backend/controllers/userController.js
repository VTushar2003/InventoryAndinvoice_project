const asyncHandler = require("express-async-handler");
const usersDetails = require("../model/UserModule");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../model/tokenModule");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register user admin only
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if email already exists
  const userExists = await usersDetails.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists, try another email");
  }

  // Create new user
  const User = await usersDetails.create({
    name,
    email,
    password,
    role,
  });

  // Generate token
  const token = generateToken(User._id);

  // Send HTTP cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (User) {
    const { _id, name, email, photo, bio, phoneNumber, role } = User;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      bio,
      phoneNumber,
      token,
      role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Find user
  const user = await usersDetails.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = generateToken(user._id);

    // Send HTTP cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, photo, bio, phoneNumber, role } = user;
    res.status(200).json({
      message: "Login successful",
      _id,
      name,
      email,
      photo,
      bio,
      phoneNumber,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout user
const logout = asyncHandler(async (req, res) => {
  if (req.cookies.token) {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
  }
  res.status(200).json({
    message: "Successfully logged out",
  });
});

// Get user details
const getUser = asyncHandler(async (req, res) => {
  const user = await usersDetails.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, bio, phoneNumber, role } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      bio,
      phoneNumber,
      role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// LoggedIn function logic
const LoggedIn = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  // If no token is found, user is not logged in
  if (!token) {
    console.log("here");
    return res.json({ LoggedIn: false });
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid, return true
    if (decoded) {
      return res.json({ LoggedIn: true });
    } else {
      return res.json({ LoggedIn: false });
    }
  } catch (error) {
    // If token verification fails, return false
    console.error("Token verification failed:", error);
    return res.json({ LoggedIn: false });
  }
});

// Update user details
const updateUser = asyncHandler(async (req, res) => {
  const { name, bio, photo, phoneNumber, role } = req.body;
  const { _id } = req.params;
  const user = await usersDetails.findById(_id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userUpdated = await usersDetails.findByIdAndUpdate(
    _id,
    { name, bio, photo, phoneNumber, role },
    { new: true, runValidators: true }
  );

  res.status(200).json({ userUpdated, body: req.body });
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, password } = req.body;
  const user = await usersDetails.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up");
  }
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please provide both old and new passwords");
  }

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  if (passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await usersDetails.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please sign up");
  }

  // Delete existing token
  let delToken = await Token.findOne({ userId: user._id });
  if (delToken) {
    await delToken.deleteOne();
  }

  // Generate reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save token to database
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 30 * 60 * 1000, // Expires in 30 min
  }).save();

  // Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Email message
  const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the following URL to reset your password. This link is valid for 30 minutes.</p>
        <a href=${resetUrl}>${resetUrl}</a>
        <p>Regards...</p>
    `;

  const subject = "Password Reset Link";
  const email_to = user.email;
  const from_email = `InventoryAndInvoice: ${process.env.EMAIL}`;

  try {
    await sendEmail(subject, message, from_email, email_to);
    res.status(200).json({ success: true, message: "Reset email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500);
    throw new Error("Reset email failed to send, please try again");
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find token in database
  const token = await Token.findOne({
    token: hashedToken,
    expiredAt: { $gt: Date.now() },
  });

  if (!token) {
    res.status(404);
    throw new Error("Invalid token");
  }

  // Find user
  const user = await usersDetails.findOne({ _id: token.userId });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.password = password;
  await user.save();

  res.status(200).json({
    message: "Password reset successful, please login with new password",
  });
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await usersDetails.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

// Get all users (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await usersDetails.find({}).sort("-createdAt");

  if (!users) {
    res.status(404);
    throw new Error("No users found");
  }

  res.status(200).json(users);
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  LoggedIn,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
  getAllUsers,
};
