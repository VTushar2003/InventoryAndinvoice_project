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

app.use(
  cors({
    origin: "https://inventra-inventory.vercel.app/", // Allow access from any domain
    credentials: true, // If you're using cookies with cross-origin
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
//connect to mongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(APP_PORT, "0.0.0.0", () => {
      // Bind to all IP addresses
      console.log(`Server running on port ${APP_PORT}`);
    });
  })
  .catch((err) => console.log(`something went worng ${err}`));
