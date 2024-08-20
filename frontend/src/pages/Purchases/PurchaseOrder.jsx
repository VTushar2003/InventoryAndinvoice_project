import React from "react";
import DefaultLayout from "./../../components/layout/Layout";
import PurchaseOrderData from "../../components/Purchases/PurchaseOrder/PurchaseOrderData";

const PurchaseOrder = () => {
  return (
    <DefaultLayout>
      <PurchaseOrderData />
    </DefaultLayout>
  );
};

export default PurchaseOrder;
