const mongoose = require('mongoose')

//user token schema
const tokenSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'usersDetails'
    },
    token : {
         type:String ,
         required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
    expiredAt : {
        type :  Date,
        required : true
    }
})

const Token = mongoose.model('Token',tokenSchema);

module.exports = Token;

