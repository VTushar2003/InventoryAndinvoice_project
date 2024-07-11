const express = require("express");
const { protect } = require("../middleWare/authMiddleWare");
const {
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  getInvoices,
  getInvoiceById,
} = require("../controllers/invoiceController");

const invoiceRouter = express.Router();

invoiceRouter.post("/", protect, createInvoice);
invoiceRouter.put("/:id", protect, updateInvoiceStatus);
invoiceRouter.delete("/:id", protect, deleteInvoice);
invoiceRouter.get("/:id", protect, getInvoiceById);
invoiceRouter.get("/", protect, getInvoices);

module.exports = invoiceRouter;
