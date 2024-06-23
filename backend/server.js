const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const {APP_PORT} = require("./config/index");
const router = require("./routes/userRoutes");
const app = express();
const path = require("path");
const errorMiddleWare = require ('./middleWare/errorMiddleWare');
const cookieParser = require('cookie-parser');
const productRouter = require("./routes/productRoute");
const invoiceRouter = require("./routes/invoiceRoute");
/* const adminRouter = require("./routes/adminRoute"); */

//middlewares
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use("/upload", express.static(path.join(__dirname, "upload")));

//route middleware
/* app.use('/api/adminDetails',adminRouter) */
app.use('/api/usersDetails',router);
app.use("/api/products", productRouter);
app.use("/api/invoice",invoiceRouter)
//routes
app.get("/",(req,res)=>{
    res.send("Home page")
});
//error middleware
app.use(errorMiddleWare);
//connect to mongoDB
//start server at port 3000
mongoose 
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(APP_PORT,()=>{
            console.log(`running ${APP_PORT}`);
        })
    })
    .catch((err)=> console.log(`something went worng ${err}`)

);
