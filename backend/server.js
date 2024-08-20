const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { APP_PORT } = require("./config/index");
const router = require("./routes/userRoutes");
const app = express();
const path = require("path");
const errorMiddleWare = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoute");
const invoiceRouter = require("./routes/invoiceRoute");
const customerRouter = require("./routes/customerRoute");
const supplierRoute = require("./routes/supplierRoute");
const purchaseOrderRouter = require("./routes/purchaseOrderRoute");

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "upload")));

//route middleware
app.use("/api/usersDetails", router);
app.use("/api/products", productRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/Customer", customerRouter);
app.use("/api/Supplier", supplierRoute);
app.use("/api/PurchaseOrder", purchaseOrderRouter);
//routes
app.get("/", (req, res) => {
  res.send("Home page");
});
//error middleware
app.use(errorMiddleWare);
//connect to mongoDB
//start server at port 3000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`running ${APP_PORT}`);
    });
  })
  .catch((err) => console.log(`something went worng ${err}`));
