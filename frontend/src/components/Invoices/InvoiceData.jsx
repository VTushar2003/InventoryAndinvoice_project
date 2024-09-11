import { Space, Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoives,
  getInvoiceById,
} from "../../services/InvoiceService";
import ViewInvoices from "./ViewInvoices";
import InvoiceEdit from "./EditInvoice";
import AddInvoice from "./AddInvoice";
import toast from "react-hot-toast";

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
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewInvoicedets, setViewInvoicedets] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

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
      toast.error("Something Went Wrong!");
      console.log("Error fetching Invoices:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  const getInvoiceDetails = async (id) => {
    try {
      const result = await getInvoiceById(id);
      setViewInvoicedets(result);
      setViewModalVisible(true);
      console.log("Invoice Details:", result);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error("Failed in getting Invoice details", error);
    }
  };

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
  const deleteInvoiceById = async (id) => {
    try {
      await deleteInvoice(id);
      getAllInvoices();
    } catch (error) {
      console.error("Error deleting Invoice:", error);
    }
  };

  const handleAddInvoice = async (invoiceData) => {
    debugger;
    try {
      await createInvoice(invoiceData);
      console.log("Submitting Invoice Data: ", invoiceData); // Log the invoice data
      setAddModalVisible(false);
      getAllInvoices();
    } catch (error) {
      console.error("Error creating Invoice:", error);
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
          <button
            className="hover:text-blue-500"
            onClick={() => getInvoiceDetails(record._id)}
          >
            <EyeOutlined />
          </button>
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditingInvoice(record);
              setEditModalVisible(true);
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="hover:text-red-700"
            onClick={() => deleteInvoiceById(record._id)}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-[1rem]">
        <Button
          type="primary"
          onClick={() => setAddModalVisible(true)}
          icon={<PlusOutlined />}
        >
          Add Invoice
        </Button>
      </div>
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
      {viewInvoicedets && (
        <ViewInvoices
          visible={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          invoiceDets={viewInvoicedets}
        />
      )}
      {editingInvoice && (
        <InvoiceEdit
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSubmit={EditInvoiceData}
          edit={editingInvoice}
        />
      )}
      <AddInvoice
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddInvoice}
      />
    </>
  );
};

export default InvoiceData;
