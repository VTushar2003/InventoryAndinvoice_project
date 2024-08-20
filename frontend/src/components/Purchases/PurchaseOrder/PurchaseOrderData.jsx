import React, { useState, useEffect } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { createPurchaseorder, getPurchaseorder } from "../../../services/PurchaseOrderService";
import AddPurchaseOrder from './AddPurchaseOrder';

const PurchaseOrderData = () => {
  const [order, setOrder] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  //replace blank space with null
  const replaceEmptyWithNull = (item) => {
    const newItem = {};
    for (const key in item) {
      newItem[key] = item[key] === "" ? null : item[key];
    }
    return newItem;
  };

  //get all purchase orders
  const getPurchaseOrders = async () => {
    try {
      const res = await getPurchaseorder();
      // Check if res is an array
      if (Array.isArray(res)) {
        const productsWithKeys = res
          .map((item, index) => ({
            ...item,
            key: item._id || index,
          }))
          .map((item) => replaceEmptyWithNull(item));
        setOrder(productsWithKeys);
        console.log(res);
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.log("Error fetching Customers:", error);
    }
  };

  useEffect(() => {
    getPurchaseOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };


  const handleAddPurchaseorder = async (purchaseData) => {
    debugger;
    try {
      await createPurchaseorder(purchaseData);
      console.log("Submitting Purchase Data: ", purchaseData);
      setViewModalVisible(false)
      getPurchaseOrders();
    } catch (error) {
      console.error("Error creating Invoice:", error);
    }
  };
  const columns = [
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => formatDate(text),
      responsive: ["sm"],
    },
    {
      className: "text-[--light-blue]",
      title: "Purchase Order#",
      dataIndex: "purchaseOrderNumber",
      key: "purchaseOrderNumber",
      responsive: ["sm"],
    },
    {
      title: "Supplier",
      dataIndex: ["supplier", "SupplierName"],
      key: "SupplierName",
      responsive: ["sm"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view purchase order Detials */}

          <button className="hover:text-blue-500">
            <EyeOutlined />
          </button>

          {/* edit purchase order Details */}
          <button className="hover:text-blue-500">
            <EditOutlined />
          </button>
          {/* delete purchase order */}
          <button className="hover:text-red-500">
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];
  return (
    <><div className="flex justify-end mb-[1rem]">
      <Button
        type="primary"
        onClick={() => { setViewModalVisible(true) }}
        icon={<PlusOutlined />}
      >
        Add Invoice
      </Button>
    </div>
      <Table
        className="font-semibold"
        bordered={true}
        columns={columns}
        dataSource={order}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20"],
        }}
      />
      <AddPurchaseOrder
        visible={viewModalVisible}
        onClose={() => { setViewModalVisible(false) }}
        onSubmit={handleAddPurchaseorder}
      />

    </>
  );
};

export default PurchaseOrderData;
