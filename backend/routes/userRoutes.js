const express = require('express');
const {registerUser,loginUser,logout, getUser, LoggedIn, updateUser, changePassword, forgotPassword, resetPassword, deleteUser, getAllUsers} = require('../controllers/userController');
const {protect,admin} = require('../middleWare/authMiddleWare');
const { upload } = require('../utils/fileUpload');
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/Logout",protect,logout);
router.get("/getuser",protect,getUser);
router.get("/LoggedIn",LoggedIn);
router.get("/getallusers",protect,admin("admin"),getAllUsers)
router.put("/updateuser/:_id",protect,admin('admin'),upload,updateUser);
router.patch("/changePassword/:id",protect,admin('admin'),changePassword);
router.post("/forgotPassword",admin('admin'),forgotPassword);
router.put("/resetpassword/:resetToken",admin('admin'),resetPassword);
router.delete('/deleteUser/:id',protect,admin('admin'),deleteUser)

module.exports = router;