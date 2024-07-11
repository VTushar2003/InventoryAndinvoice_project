import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoives,
  getInvoiceById,
} from "../../services/InvoiceService";
import ViewInvoices from "./ViewInvoices";
import InvoiceEdit from "./InvoiceEdit";

const initialState = {
  customerName: "",
  invoiceOrder: "",
  items: "",
  paymentMode: "",
  amountPaid: "",
  status: "",
  invoiceDate: "",
  dueDate: "",
};

const InvoiceData = () => {
  const [invoice, setInvoice] = useState([]);
  const [addInvoice, setAddInvoice] = useState(initialState);

  const {
    customerName,
    invoiceOrder,
    items,
    paymentMode,
    amountPaid,
    status,
    invoiceDate,
    dueDate,
  } = addInvoice;

  //add invoice
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddCustomer({ ...addInvoice, [name]: value });
  };

  //replace blank space with null
  const replaceEmptyWithNull = (item) => {
    const newItem = {};
    for (const key in item) {
      newItem[key] = item[key] === "" ? null : item[key];
    }
    return newItem;
  };

  const getAllInvoices = async () => {
    try {
      const res = await getInvoives();
      if (Array.isArray(res)) {
        const productsWithKeys = res
          .map((item, index) => ({
            ...item,
            key: item._id || index,
          }))
          .map((item) => replaceEmptyWithNull(item));
        setInvoice(productsWithKeys);
        console.log(res);
      } else if (res && res.data && Array.isArray(res.data)) {
        const productsWithKeys = res.data
          .map((item, index) => ({
            ...item,
            key: item._id || index,
          }))
          .map((item) => replaceEmptyWithNull(item));
        setInvoice(productsWithKeys);
        console.log(res.data);
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.log("Error fetching Invoices:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  useEffect(() => {
    getAllInvoices();
  }, []);
  //get invoice by id
  const [viewInvoicedets, setViewInvoicedets] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const getInvoiceDetails = async (id) => {
    try {
      const result = await getInvoiceById(id);
      setViewInvoicedets(result);
      setViewModalVisible(true);
      console.log("invoice Details :", result);
    } catch (error) {
      console.error("Failed in getting Invoice details", error);
    }
  };

  //edit invoice
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const EditInvoiceData = async (invoiceData) => {
    try {
      await updateInvoice(editingInvoice._id, invoiceData);
      console.log(invoiceData);
      setEditModalVisible(false);
      getAllInvoices();
    } catch (error) {
      console.error("Error updating Invoice:", error);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      render: (text) => formatDate(text),
      responsive: ["sm"],
    },
    {
      title: "Invoice#",
      dataIndex: "invoiceOrder",
      key: "invoiceOrder",
      responsive: ["sm"],
    },
    {
      title: "Customer Name",
      dataIndex: ["customer", "CustomerName"],
      key: "CustomerName",
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["sm"],
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => formatDate(text),
      responsive: ["sm"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      responsive: ["sm"],
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view Invoice details */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              getInvoiceDetails(record._id);
            }}
          >
            <EyeOutlined />
          </button>
          {/* edit Invoice */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditingInvoice(record);
              setEditModalVisible(true);
            }}
          >
            <EditOutlined />
          </button>
          {/* delete Invoice */}
          <button className="hover:text-red-700">
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];
  return (
    <>
      <Table
        rowClassName="text-[1rem] text-center"
        bordered={true}
        columns={columns}
        size="large"
        dataSource={invoice}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
      {/* view invoice */}
      {viewInvoicedets && (
        <ViewInvoices
          visible={viewModalVisible}
          onClose={() => {
            setViewModalVisible(false);
          }}
          invoiceDets={viewInvoicedets}
        />
      )}
      {/* edit invoice */}
     {editingInvoice && (
        <InvoiceEdit 
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={EditInvoiceData}
        edit={editingInvoice}
        />
     )}
    </>
  );
};

export default InvoiceData;
