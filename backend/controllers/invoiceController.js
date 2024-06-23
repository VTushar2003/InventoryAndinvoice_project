const asyncHandler = require('express-async-handler');
const Invoice = require('../model/invoiceModule');
const Product = require('../model/productModule');

// Create a new invoice
const createInvoice = asyncHandler(async (req, res) => {
    const { items } = req.body;
  
    // Fetch product details
    const productDetails = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findOne(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );
  
    // Calculate total amount
    const totalAmount = productDetails.reduce((total, item) => total + (item.quantity * item.price), 0);
  
    const invoice = new Invoice({
      user: req.user._id,
      items: productDetails,
      totalAmount,
    });
  
    const createdInvoice = await invoice.save();
    res.status(201).json(createdInvoice);
  });
  
  //update invoice status

  const updateInvoiceStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    
    const updatedInvoice = await Invoice.findByIdAndUpdate(id,{
      status: status,
      updatedAt: Date.now(),
    }, { new: true, runValidators: true });
  
    if (!updatedInvoice) {
      res.status(404);
      throw new Error('Invoice not found');
    }
  
    res.status(200).json(updatedInvoice);
  });
  
module.exports = {createInvoice,updateInvoiceStatus}