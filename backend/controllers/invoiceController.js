const asyncHandler = require("express-async-handler");
const Invoice = require("../model/invoiceModule");
const Product = require("../model/productModule");
const Customer = require("../model/customerModule");

// Create a new invoice
const createInvoice = asyncHandler(async (req, res) => {
  const {
    customerName,
    invoiceOrder,
    items,
    paymentMode,
    amountPaid,
    status,
    invoiceDate,
    dueDate,
  } = req.body;

  // Fetch customer details
  const customer = await Customer.findOne({ CustomerName: customerName });
  if (!customer) {
    res.status(404);
    throw new Error(`Customer with ID ${customerName} not found`);
  }

  // Fetch product details by productId
  const productDetails = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      if (product.quantity < item.quantity) {
        throw new Error(
          `Insufficient quantity for product ${product.productId}`
        );
      }
      // Decrease the product quantity
      product.quantity -= item.quantity;
      await product.save();

      return {
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      };
    })
  );

  // Calculate total amount
  const totalAmount = productDetails.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const invoice = new Invoice({
    user: req.user._id,
    invoiceOrder,
    customer: customer._id,
    items: productDetails,
    totalAmount,
    amountDue: totalAmount - amountPaid,
    amountPaid,
    paymentMode,
    status,
    invoiceDate,
    dueDate,
  });

  const createdInvoice = await invoice.save();

  customer.totalAmountDue += invoice.amountDue;
  customer.totalAmountPaid += invoice.amountPaid;
  await customer.save();

  res.status(201).json(createdInvoice);
});

// Update invoice status
const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const { customerName, status, paymentMode, amountPaid, dueDate, addedItems } =
    req.body;
  const { id } = req.params;

  const invoice = await Invoice.findById(id).populate("customer");
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  // Update customer totals before modifying the invoice
  const customer = await Customer.findById(invoice.customer._id);
  customer.totalAmountDue -= invoice.amountDue;
  customer.totalAmountPaid -= invoice.amountPaid;
  await customer.save();

  // Update the customer name if provided
  if (customerName) {
    const newCustomer = await Customer.findOne({ CustomerName: customerName });
    if (!newCustomer) {
      res.status(404);
      throw new Error(`Customer with name ${customerName} not found`);
    }

    // Update customer totals for the new customer
    newCustomer.totalAmountDue += invoice.amountDue;
    newCustomer.totalAmountPaid += invoice.amountPaid;
    await newCustomer.save();

    invoice.customer = newCustomer._id;
  }

  // Update the due date if provided
  if (dueDate) {
    invoice.dueDate = dueDate;
  }

  // Update the added items if provided
  if (addedItems && addedItems.length > 0) {
    const productDetails = await Promise.all(
      addedItems.map(async (item) => {
        const product = await Product.findOne({ productId: item.productId });
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (product.quantity < item.quantity) {
          throw new Error(
            `Insufficient quantity for product ${product.productId}`
          );
        }
        // Decrease the product quantity
        product.quantity -= item.quantity;
        await product.save();

        return {
          product: product._id,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    // Update the total amount
    const additionalAmount = productDetails.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    invoice.items = [...invoice.items, ...productDetails];
    invoice.totalAmount += additionalAmount;
    invoice.amountDue += additionalAmount;
  }

  invoice.amountPaid += amountPaid;
  invoice.amountDue = invoice.totalAmount - invoice.amountPaid;
  invoice.paymentMode = paymentMode;
  invoice.status = status;
  invoice.updatedAt = Date.now();

  const updatedInvoice = await invoice.save();

  // Update the customer's totals with the new invoice amounts
  customer.totalAmountDue += invoice.amountDue;
  customer.totalAmountPaid += invoice.amountPaid;
  await customer.save();

  res.status(200).json(updatedInvoice);
});

// Delete an invoice
const deleteInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invoice = await Invoice.findById(id);
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  // Update customer's total amount due and paid
  const customer = await Customer.findById(invoice.customer);
  if (customer) {
    customer.totalAmountDue -= invoice.amountDue;
    customer.totalAmountPaid -= invoice.amountPaid;

    // Ensure the values do not go below zero
    customer.totalAmountDue = Math.max(customer.totalAmountDue, 0);
    customer.totalAmountPaid = Math.max(customer.totalAmountPaid, 0);

    await customer.save();
  }

  // Delete the invoice
  await invoice.deleteOne();
  res.status(200).json({ message: "Invoice deleted successfully" });
});

// Get all invoices
const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find()
    .populate("customer")
    .populate("items.product");
  res.status(200).json(invoices);
});

// Get an invoice by ID
const getInvoiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const invoice = await Invoice.findById(id)
    .populate("customer")
    .populate("items.product");
  if (!invoice) {
    res.status(404);
    throw new Error("Invoice not found");
  }

  res.status(200).json(invoice);
});

module.exports = {
  createInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  getInvoices,
  getInvoiceById,
};