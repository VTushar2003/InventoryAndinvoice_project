const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({

    name : { 
        type : String ,
        required : [true,"Please Enter Your Name"]
    },
    email : {
        type : String ,
        required : [true,"Please Enter Your Email"],
        unique : true,
        trim : true,
        match :[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Enter a Valid Email"]
    },
    phoneNumber : {
        type : String,
        required : [true,'Please Enter Your Phone Number'],
        default : '+91',
    },
    password : {
        type : String ,
        required : [true,"please Add a password"],
        trim : true,
        minLength : [6,"password must be upto 6 characters"],
        // maxLength : [30,"password must not be more than 30 characters"],
    },
    role : {
        type: String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    photo : {
        type : String,
        required : [true,"please add a photo"],
        default : "https://www.vecteezy.com/vector-art/8302514-eps10-white-vector-user-solid-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-black-background",
    },
    bio : {
        type : String,
        maxLength : [250,"bio must not be more than 250 Characters"],
        default : "bio"
    }

},
{
    timestamps : true,
});

//encrypt password

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    //encrypt password before saving 
const salt = await bcrypt.genSalt(10)
const hashedPass = await bcrypt.hash(this.password,salt)
this.password = hashedPass
next();
})

const usersDetails = mongoose.model("userDetails",UserSchema);

module.exports = usersDetails; 