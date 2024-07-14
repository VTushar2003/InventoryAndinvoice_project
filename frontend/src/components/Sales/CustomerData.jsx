import { Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "./../../services/CustomerService";
import toast from "react-hot-toast";
import AddCustomer from "./AddCustomer";
import CustomerDetails from "./CustomerDetails";
import EditCustomer from "./EditCustomer";

const initialState = {
  customerType: "",
  CustomerName: "",
  companyName: "",
  customerEmail: "",
  customerContactInfo: "",
  CustomerAddress: "",
};

const CustomerData = () => {
  //get customer state
  const [customer, setCustomer] = useState([]);
  //add customer change state
  const [addCustomer, setAddCustomer] = useState(initialState);
  const {
    customerType,
    CustomerName,
    companyName,
    customerEmail,
    customerContactInfo,
    CustomerAddress,
  } = addCustomer;

  //replace blank space with null
  const replaceEmptyWithNull = (item) => {
    const newItem = {};
    for (const key in item) {
      newItem[key] = item[key] === "" ? null : item[key];
    }
    return newItem;
  };

  //get all customers
  const getAllCustomers = async () => {
    try {
      const res = await getCustomers();
      // Check if res is an array
      if (Array.isArray(res)) {
        const productsWithKeys = res
          .map((item, index) => ({
            ...item,
            key: item._id || index,
          }))
          .map((item) => replaceEmptyWithNull(item));
        setCustomer(productsWithKeys);
        console.log(res); // Corrected from response.data to res
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) {
      console.log("Error fetching Customers:", error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  //add customer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddCustomer({ ...addCustomer, [name]: value });
  };
  const handleCustomerType = (e) => {
    setAddCustomer({ ...addCustomer, customerType: e.target.value });
  };

  const addCustomerData = async (e) => {
    e.preventDefault();
    if (
      !customerType ||
      !CustomerName ||
      !companyName ||
      !customerEmail ||
      !CustomerAddress
    ) {
      return toast.error("All fields are required");
    }
    const customerData = {
      customerType,
      CustomerName,
      companyName,
      customerEmail,
      customerContactInfo,
      CustomerAddress,
    };
    try {
      debugger;
      const res = await createCustomer(customerData);
      toast.success("customer is created Successfully!");
      getAllCustomers();
    } catch (error) {
      console.log("message", error);
      toast.error("something went wrong , please try again");
    }
  };
  const [viewCustomer, setViewCustomer] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  //get customer details by id
  const viewCustomerDetails = async (id) => {
    try {
      debugger;
      const result = await getCustomerById(id);
      setViewCustomer(result);
      setViewModalVisible(true);
      console.log("Customer Details :", result);
    } catch (error) {
      console.error("Failed in getting Customer details", error);
    }
  };
  //edit customer details

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const EditCustomerData = async (customerData) => {
    try {
      await updateCustomer(editingCustomer._id, customerData);
      console.log(customerData);
      setEditModalVisible(false);
      getAllCustomers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  //delete customer
  const deleteCustomerData = async (id) => {
    try {
      await deleteCustomer(id);
      getAllCustomers();
      console.log(id);
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      className: "capitalize",
      title: "Customer Type",
      dataIndex: "customerType",
      key: "customerType",
      responsive: ["sm"],
    },
    {
      title: "Customer Name",
      dataIndex: "CustomerName",
      key: "CustomerName",
      responsive: ["sm"],
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      responsive: ["sm"],
    },
    {
      title: "Contact Info",
      dataIndex: "customerContactInfo",
      key: "customerContactInfo",
      responsive: ["sm"],
    },
    {
      title: "Amount due",
      dataIndex: "totalAmountDue",
      key: "totalAmountDue",
      responsive: ["sm"],
    },

    {
      title: "Amount Paid",
      dataIndex: "totalAmountPaid",
      key: "totalAmountPaid",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view Customer details */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              viewCustomerDetails(record._id);
            }}
          >
            <EyeOutlined />
          </button>
          {/* edit Customer */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditingCustomer(record);
              setEditModalVisible(true);
            }}
          >
            <EditOutlined />
          </button>
          {/* delete Customer */}
          <button
            className="hover:text-red-700"
            onClick={() => {
              deleteCustomerData(record._id);
            }}
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
        <AddCustomer
          customer={addCustomer}
          handleInputChange={handleInputChange}
          handleCustomerType={handleCustomerType}
          addcustomer={addCustomerData}
        />
      </div>
      <Table
        rowClassName="text-[1rem] text-center"
        bordered={true}
        columns={columns}
        size="large"
        dataSource={customer}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
      {/* view customer details */}
      {viewCustomer && (
        <CustomerDetails
          visible={viewModalVisible}
          onClose={() => {
            setViewModalVisible(false);
          }}
          customerDets={viewCustomer}
        />
      )}
      {/* editing customer details */}
      {editingCustomer && (
        <EditCustomer
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSubmit={EditCustomerData}
          edit={editingCustomer}
        />
      )}
    </>
  );
};

export default CustomerData;
