const asyncHandler = require("express-async-handler");
const Supplier = require("../model/purchaseModule");
const Product = require("../model/productModule");
const PurchaseOrder = require("../model/purchaseOrderModel");
// Create Purchase Order
const createPurchaseOrder = asyncHandler(async (req, res) => {
  const {
    purchaseOrderNumber,
    supplier: SupplierName,
    orderDate,
    items,
    deliveryDate,
    status,
  } = req.body;

  // Validate required fields
  if (!purchaseOrderNumber || !orderDate || !items || !deliveryDate) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Fetch supplier details
  const supplier = await Supplier.findOne({ SupplierName: SupplierName });
  if (!supplier) {
    res.status(404);
    throw new Error("Supplier not found");
  }

  // Populate product details for each item
  const populatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findOne({ productId: item.productId });
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      const unitPrice = item.unitPrice || product.price;
      const totalPrice = unitPrice * item.quantity;
      return {
        product: product._id,
        quantity: item.quantity,
        unitPrice,
        totalPrice,
      };
    })
  );

  // Calculate total amount
  const calculatedTotalAmount = populatedItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const newPurchaseOrder = new PurchaseOrder({
    purchaseOrderNumber,
    supplier: supplier._id,
    user: req.user._id,
    orderDate,
    items: populatedItems,
    totalAmount: calculatedTotalAmount,
    deliveryDate,
    status,
  });

  const createdPurchaseOrder = await newPurchaseOrder.save();
  res.status(201).json(createdPurchaseOrder);
});

// Update Purchase Order
const updatePurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    purchaseOrderNumber,
    supplier: SupplierName,
    orderDate,
    items,
    deliveryDate,
    status,
  } = req.body;

  const purchaseOrder = await PurchaseOrder.findById(id);

  if (!purchaseOrder) {
    res.status(404);
    throw new Error("Purchase order not found");
  }

  // Update only the provided fields
  if (purchaseOrderNumber)
    purchaseOrder.purchaseOrderNumber = purchaseOrderNumber;
  if (SupplierName) {
    const supplier = await Supplier.findOne({ SupplierName: SupplierName });
    if (!supplier) {
      res.status(404);
      throw new Error("Supplier not found");
    }
    purchaseOrder.supplier = supplier._id;
  }
  if (orderDate) purchaseOrder.orderDate = orderDate;
  if (deliveryDate) purchaseOrder.deliveryDate = deliveryDate;
  if (paymentTerms) purchaseOrder.paymentTerms = paymentTerms;
  if (status) purchaseOrder.status = status;

  if (items) {
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with id ${item.product} not found`);
        }
        const unitPrice = item.unitPrice || product.price;
        const totalPrice = unitPrice * item.quantity;
        return {
          product: product._id,
          quantity: item.quantity,
          unitPrice,
          totalPrice,
        };
      })
    );

    // Calculate total amount
    const calculatedTotalAmount = populatedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    purchaseOrder.items = populatedItems;
    purchaseOrder.totalAmount = calculatedTotalAmount;
  }

  const updatedPurchaseOrder = await purchaseOrder.save();
  res.status(200).json(updatedPurchaseOrder);
});

// Delete Purchase Order
const deletePurchaseOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const purchaseOrder = await PurchaseOrder.findById(id);

  if (!purchaseOrder) {
    res.status(404);
    throw new Error("Purchase order not found");
  }

  await purchaseOrder.remove();
  res.status(200).json({ message: "Purchase order removed" });
});

// Get All Purchase Orders
const getAllPurchaseOrders = asyncHandler(async (req, res) => {
  const purchaseOrders = await PurchaseOrder.find({})
    .populate({ path: "supplier", select: "SupplierName" })
    .populate({ path: "user", select: "name" })
    .populate("items.product")
    .sort("-createdAt");

  if (!purchaseOrders || purchaseOrders.length === 0) {
    res.status(404);
    throw new Error("No purchase orders found");
  }

  res.status(200).json(purchaseOrders);
});

// Get Purchase Order by ID
const getPurchaseOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const purchaseOrder = await PurchaseOrder.findById(id)
    .populate({ path: "supplier", select: "SupplierName" })
    .populate({ path: "user", select: "name" })
    .populate("items.product");

  if (!purchaseOrder) {
    res.status(404);
    throw new Error("Purchase order not found");
  }

  res.status(200).json(purchaseOrder);
});

module.exports = {
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
};
