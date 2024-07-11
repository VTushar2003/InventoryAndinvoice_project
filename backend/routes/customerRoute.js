const express = require("express");
const customerRouter = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const { protect } = require("../middleWare/authMiddleWare");

//create customer
customerRouter.post("/", protect, createCustomer);
//get customer
customerRouter.get("/", protect, getCustomers);
//get customer by id
customerRouter.get("/:id", protect, getCustomerById);
//delete customer
customerRouter.delete("/:id", protect, deleteCustomer);
//update customer
customerRouter.put("/:id", protect, updateCustomer);

module.exports = customerRouter;
