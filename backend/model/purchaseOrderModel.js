const mongoose = require("mongoose");

const PurchaseOrderSchema = new mongoose.Schema(
  {
    purchaseOrderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Supplier",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userDetails",
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const PurchaseOrder = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
module.exports = PurchaseOrder;
