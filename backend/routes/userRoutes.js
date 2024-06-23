const express = require('express');
const {registerUser,loginUser,logout, getUser, LoggedIn, updateUser, changePassword, forgotPassword, resetpassword, deleteUser, getAllUsers} = require('../controllers/userController');
const {protect,admin} = require('../middleWare/authMiddleWare');
const router = express.Router();

router.post("/register",protect,admin('admin'),registerUser);
router.post("/Login",loginUser);
router.get("/Logout",logout);
router.get("/getuser",protect,getUser);
router.get("/LoggedIn",LoggedIn);
router.get("/getallusers",protect,admin("admin"),getAllUsers)
router.patch("/updateuser/:id",protect,admin('admin'),updateUser);
router.patch("/changePassword/:id",protect,admin('admin'),changePassword);
router.post("/forgotPassword",admin('admin'),forgotPassword);
router.put("/resetpassword/:resetToken",admin('admin'),resetpassword);
router.delete('/deleteUser/:id',protect,admin('admin'),deleteUser)

module.exports = router;