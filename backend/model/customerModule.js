const mongoose = require("mongoose");

//customer schema
const CustomerSchema = new mongoose.Schema(
  {
    customerType: {
      type: String,
      enum: ["business", "individual"],
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Please Enter Customer Email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Enter a Valid Email",
      ],
    },
    customerContactInfo: {
      type: String,
      required: [true, "Please Enter Customer Phone Number"],
      default: "+91",
    },
    CustomerAddress: {
      type: String,
      required: [true, "Please enter Customer Address"],
    },

    totalAmountDue: {
      type: Number,
      default: 0,
    },
    totalAmountPaid: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
