const express = require("express");
const { protect } = require("../middleWare/authMiddleWare");
const {
  createPurchaseOrder,
  getAllPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/purchaseOrderController");
const purchaseOrderRouter = express.Router();

purchaseOrderRouter.post("/", protect, createPurchaseOrder);
purchaseOrderRouter
  .get("/", protect, getAllPurchaseOrders)
  .get("/:id", protect, getPurchaseOrderById);
purchaseOrderRouter.put("/:id", protect, updatePurchaseOrder);
purchaseOrderRouter.delete("/:id", protect, deletePurchaseOrder);

module.exports = purchaseOrderRouter;
