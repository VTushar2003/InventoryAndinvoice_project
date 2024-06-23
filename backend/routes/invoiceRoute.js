const express = require("express");
const {protect,admin} = require('../middleWare/authMiddleWare');
const { createInvoice, updateInvoiceStatus } = require("../controllers/invoiceController");

const invoiceRouter = express.Router();

invoiceRouter.post('/createinvoice',protect,createInvoice);
invoiceRouter.put('/InvoiceStatus/:id',protect,admin("admin"),updateInvoiceStatus);

module.exports = invoiceRouter;