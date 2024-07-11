const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  SupplierName: {
    type: String,
    required: [true, "please enter Supplier Name"],
  },
  SupplierCompanyName: {
    type: String,
    required: [true, "please enter Supplier Company Name"],
  },
  SupplierEmail: {
    type: String,
    required: [true, "Please Enter Customer Email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Enter a Valid Email",
    ],
  },
  SupplierContactInfo: {
    type: String,
    required: [true, "please enter supplier Contact info"],
  },
  SupplierAddress: {
    type: String,
    required: [true, "Please enter Customer Address"],
  },
});
const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;
