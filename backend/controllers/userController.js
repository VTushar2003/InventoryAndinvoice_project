const asyncHandler = require('express-async-handler')
const usersDetails = require('../model/UserModule')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Token = require('../model/tokenModule')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')


 const generateToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{expiresIn : '1d'});
 };
//register user admin only
const registerUser = asyncHandler( async ( req , res) =>{
    const {name,email,password,role} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("please Fill in All required Fields")
    }
    if(password.length < 6 ){
        res.status(400)
        throw new Error("password must be upto 6 characters")
    }
    //check email already exists or not
    const userexists = await usersDetails.findOne({email})

    if(userexists){
        res.status(400)
        throw new Error("Email is already exists try Another Email")
    }

//create new User
    const User = await usersDetails.create({
        name,
        email,
        password,
        role
    })
//generate token 
    const token = generateToken(User._id)
//send http cookie
res.cookie('token',token,{
    path : '/',
    httpOnly : true,
    expires : new Date(Date.now()+1000 * 86400), //1day
    sameSite : 'none',
    secure : true
});
    if(User){
        const {_id,name,email,photo,bio,phoneNumber,role} = User
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            bio,
            phoneNumber,
            token,
            role
        })
    }
    else{
        res.status(400) 
        throw new Error('Invalid user data') 
    }
}
);

//login user
const loginUser = asyncHandler( async (req,res)=>{
    const {email,password} =  req.body
    if(!email || !password) {
        
        res.status(400)
        throw new Error("enter required fields");
    }
    //find user is exist or not
    const user =await usersDetails.findOne({email})
    if(!user){
        res.status(400)
        throw new Error('user not found ,please SignUp')
    }
    if (!user.password) {
        return res.status(400).json({ message: 'User password is undefined' });
      }

    //check password is correct or not
//generate token 
const token = generateToken(user._id)
//send http cookie
res.cookie('token',token,{
    path : '/',
    httpOnly : true,
    expires : new Date(Date.now()+1000 * 86400), //1day
    sameSite : 'none',
    secure : true
});

    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
       
        const {_id,name,email,photo,bio,phoneNumber,role} = user
        res.status(200).json({
            message : 'Login Successful',
            _id,
            name,
            email,
            photo,
            bio,
            phoneNumber,
            role,
            token
        })
    }
    else{
        res.status(400)
        throw new Error('InValid email and Password')
    }
})


//logout user 
const logout = asyncHandler(async ( req,res)=>{
//send http cookie
res.cookie('token',"",{
    path : '/',
    httpOnly : true,
    expires : new Date(0), 
    sameSite : 'none',
    secure : false
});
    res.status(200).json({
        message : "Successfully Logout"
    })
})
//get user details
const getUser = asyncHandler(async (req,res)=>{

    const user = await usersDetails.findById(req.user._id)

    if(user){ 
         const {_id,name,email,photo,bio,phoneNumber} = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            bio,
            phoneNumber,
        })
    }
    else{
        res.status(404)
        throw new Error('user not found')
    }
})

//LoggedIn function logic

const LoggedIn = asyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded){
            return res.json(true);
        }
        else{
            return res.json(false);
        }
})

//update user details logic


const updateUser = asyncHandler(async(req,res)=>{
    const { name,bio,photo,phoneNumber} = req.body;
    const { id } = req.params;
    const user = await usersDetails.findById(id);  

    if(!user){
        res.status(404)
        throw new Error('user not found')
    }

    const userUpdated = await usersDetails.findByIdAndUpdate({_id : id},{
        name ,
        bio,
        photo,
        phoneNumber

    },{
        new : true,
        runValidators : true,
    })

    res.status(201).json(userUpdated);
});


//change password logic

const changePassword = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {oldPassword,password} = req.body;
    const user = await usersDetails.findById(id)
    if(!user){ 
        res.status(400)
        throw new Error('user not found, please signUp')
    }
       if(!oldPassword || !password){
        res.status(404)
        throw new Error('please add old password and new password')
       }
       //check password is correct
       const passwordIsCorrect = await bcrypt.compare(oldPassword,user.password);
       //saveing new password
       if(passwordIsCorrect && user ){
            user.password = password
            await user.save()
            res.status(200).send("password change successful")
       }
       else{
        res.status(404)
        throw new Error('old password is incorrect , please enter correct password')
    }
})

//forgot passcode logic

const forgotPassword = asyncHandler(async (req, res,next) => {
    const { email } = req.body;
    const user = await usersDetails.findOne({ email });

    if (!user) {
        res.status(400);
        throw new Error('User not found, please sign up');
    }
    // Deleting existing token created by the user to reset passcode
    let delToken = await Token.findOne({ userId: user._id});
    if (delToken) {
      await delToken.deleteOne(); // Corrected to call deleteOne on the found token document
    }
    // Generating reset token code
    let resetToken = crypto.randomBytes(32).toString('hex') + user._id;

    // Hashing the token
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Saving token to database
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiredAt: Date.now() + 30 * 60 * 1000 // Expires in 30 min
    }).save();

    // Reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the below URL to reset your password</p>
        <p>This link is valid for 30 minutes</p>
        <a href=${resetUrl}>${resetUrl}</a>
        <p>Regards...</p>
    `;

    const subject = "Password Reset Link";
    const email_to = user.email;
    const from_email = `InventoryAndInvoice: ${process.env.EMAIL}`;

    try {
        await sendEmail(subject, message, from_email, email_to);
        res.status(200).json({ success: true, message: "Reset Email sent" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500);
        throw new Error("Reset Email failed to send, please try again");
    }
});
const resetpassword = asyncHandler(async (req,res)=>{
    const {password} = req.body;
    const {resetToken} = req.params;
//hashed token then comapre token
    const HashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //find token inside DB
    const token = await Token.findOne({
        token : HashedToken,
        expiredAt :  {$gt: Date.now()} 
    })
    if(!token ){
        res.status(404);
        throw new Error('Invalid token')
    }
    const user = await usersDetails.findOne({_id : token.userId});
    user.password = password
    await user.save();

    res.status(200).json({
        message : 'password reset Successful , please login with new password'
    })
})

//deleting user 

const deleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const user = await usersDetails.findById(id)
    if(!user){
        res.status(404);
        throw new Error('something went wrong')
    }
await user.deleteOne()
res.status(201).json({message : "User Deleted Successful"})
});

//get all users at once {onlyadmin function}

// Get all users (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
   
    const users = await usersDetails.find().sort('-createdAt');
  
    if (!users) {
      res.status(404);
      throw new Error('No users found');
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
    resetpassword,
    deleteUser,
    getAllUsers,
}