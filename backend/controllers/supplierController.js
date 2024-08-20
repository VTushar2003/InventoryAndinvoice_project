const asyncHandler = require("express-async-handler");
const Supplier = require("../model/purchaseModule");

// Create supplier
const createSupplier = asyncHandler(async (req, res) => {
  const {
    SupplierName,
    SupplierCompanyName,
    SupplierEmail,
    SupplierContactInfo,
    SupplierAddress,
  } = req.body;

  const supplier = await Supplier.create({
    user: req.user._id, //authenticate using middleWare
    SupplierName,
    SupplierCompanyName,
    SupplierEmail,
    SupplierContactInfo,
    SupplierAddress,
  });

  res.status(201).json(supplier);
});

// Get all suppliers
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

// Get supplier by Id
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id).populate({
    path: "user",
    select: "name",
  });
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

// Update supplier
const updateSupplier = asyncHandler(async (req, res) => {
  const {
    SupplierName,
    SupplierCompanyName,
    SupplierEmail,
    SupplierContactInfo,
    SupplierAddress,
  } = req.body;

  const { id } = req.params;

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }

  const updatedSupplier = await Supplier.findByIdAndUpdate(
    id,
    {
      SupplierName,
      SupplierCompanyName,
      SupplierEmail,
      SupplierContactInfo,
      SupplierAddress,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedSupplier);
});

// Delete supplier
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    await supplier.deleteOne();
    res.json({ message: "Supplier deleted" });
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
