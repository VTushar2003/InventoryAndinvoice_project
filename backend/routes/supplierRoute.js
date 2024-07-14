const express = require("express");
const { protect } = require("../middleWare/authMiddleWare");
const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");
const supplierRoute = express.Router();

supplierRoute.post("/", protect, createSupplier);
supplierRoute.get("/", protect, getSuppliers);
supplierRoute.get("/:id", protect, getSupplierById);
supplierRoute.put("/:id", protect, updateSupplier);
supplierRoute.delete("/:id", protect, deleteSupplier);


module.exports =supplierRoute;