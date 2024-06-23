const asyncHandler = require('express-async-handler');
const usersDetails = require('../model/UserModule');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("Token is not provided");
        res.status(401);
        throw new Error('Not authorized, please login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user id from token
        const user = await usersDetails.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401);
        throw new Error('Not authorized, please login');
    }
});

const admin = (role)=>{
  return (req,res,next)=>{
    if(req.user && req.user.role !==  role){
      res.status(403);
      throw new Error('not authorized to access')
    }
    next();
  }
}

module.exports = {protect,admin};
