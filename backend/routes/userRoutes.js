const express = require("express");
const {
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
  getUserById,
  createUser,
  checkEmailExists,
} = require("../controllers/userController");
const { protect, admin } = require("../middleWare/authMiddleWare");
const { profile } = require("../utils/fileUpload");
const router = express.Router();

//register user
router.post("/register", registerUser);
//loginuser
router.post("/login", loginUser);
//logoutuser
router.get("/Logout", protect, logout);
//getuser
router.get("/getuser", protect, getUser);
//check login status
router.get("/LoggedIn", LoggedIn);
//getuserbyid
router.get("/getuser/:_id", getUserById);
//getalluser(onlyAdmin access)
router.get("/getallusers", protect, admin("admin"), getAllUsers);
//update user(onlyAdmin access)
router.put("/updateuser/:_id", protect, profile, updateUser);
//changepassword(onlyAdmin access)
router.patch("/changePassword", protect, changePassword);
//forgotpassword(onlyAdmin access)
router.post("/forgotPassword", admin("admin"), forgotPassword);
//resetpassword
router.put("/resetpassword/:resetToken", admin("admin"), resetPassword);
//deleteuser(adminonlyaccess)
router.delete("/deleteUser/:_id", protect, admin("admin"), deleteUser);
//createuser admin only
router.post("/createUser", protect, admin("admin"), createUser);
//check email exist or not
router.post("/CheckEmail", checkEmailExists);

module.exports = router;
