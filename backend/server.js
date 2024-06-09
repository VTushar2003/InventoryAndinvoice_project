const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const {APP_PORT} = require("./config/index")

const app = express();

//connect to mongoDB
//start server at port 3000
mongoose 
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(APP_PORT,()=>{
            console.log(`running ${APP_PORT}`);
        })
    })
    .catch((err)=> console.log(err)

)
