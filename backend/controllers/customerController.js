const asyncHandler = require("express-async-handler");
const Customer = require("../model/customerModule");

//create customer
const createCustomer = asyncHandler(async (req, res) => {
  const {
    customerType,
    CustomerName,
    companyName,
    customerEmail,
    customerContactInfo,
    CustomerAddress,
  } = req.body;

  const customer = await Customer.create({
    customerType,
    CustomerName,
    companyName,
    customerEmail,
    customerContactInfo,
    CustomerAddress,
  });

  res.status(201).json(customer);
});

//get all customer

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

//get customer by Id

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//update customer

const updateCustomer = asyncHandler(async (req, res) => {
  const {
    customerType,
    CustomerName,
    companyName,
    customerEmail,
    customerContactInfo,
    CustomerAddress,
  } = req.body;

  const { id } = req.params;

  const customer = await Customer.findById(id);

  if (!customer) {
    res.status(404);
    throw new Error("Customer not found");
  }
  const updatedCustomer = await Customer.findByIdAndUpdate(
    id,
    {
      customerType,
      CustomerName,
      companyName,
      customerEmail,
      customerContactInfo,
      CustomerAddress,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json(updatedCustomer);
});

//delete customer
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.deleteOne();
    res.json({ message: "Customer deleted" });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
