import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createSupplier,
  deleteSupplier,
  getSuppliers,
  getSuppluerById,
  updateSupplier,
} from "./../../services/SuppliersService";
import toast from "react-hot-toast";
import AddSuppliers from "./AddSuppliers";
import ViewSupplierDetails from "./ViewSupplierDetails";
import EditSupplier from "./EditSupplier";

const initialState = {
  SupplierName: "",
  SupplierCompanyName: "",
  SupplierEmail: "",
  SupplierContactInfo: "",
  SupplierAddress: "",
};
const SupplierData = () => {

  const [supplier, setSupplier] = useState([]);

  //replace blank space with null
  const replaceEmptyWithNull = (item) => {
    const newItem = {};
    for (const key in item) {
      newItem[key] = item[key] === "" ? null : item[key];
    }
    return newItem;
  };

  const getAllSuppliers = async () => {
    try {
      const res = await getSuppliers();
      if (Array.isArray(res)) {
        const productsWithKeys = res
          .map((item, index) => ({
            ...item,
            key: item._id || index,
          }))
          .map((item) => replaceEmptyWithNull(item));
        setSupplier(productsWithKeys);
      } else {
        console.error("Unexpected response structure:", res);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getAllSuppliers();
  }, []);

  const [addSupplier, setAddSupplier] = useState(initialState);
  const {
    SupplierName,
    SupplierCompanyName,
    SupplierEmail,
    SupplierContactInfo,
    SupplierAddress,
  } = addSupplier;
  //add supplier
  const AddSupplierHandle = async (e) => {
    e.preventDefault();

    const supplierData = {
      SupplierName,
      SupplierCompanyName,
      SupplierEmail,
      SupplierContactInfo,
      SupplierAddress,
    };
    if (
      !SupplierName ||
      !SupplierCompanyName ||
      !SupplierEmail ||
      !SupplierContactInfo ||
      !SupplierAddress
    ) {
      return toast.error("All fields are required");
    }
    try {
      await createSupplier(supplierData);
      toast.success("Supplier Created Successfully!");
      getAllSuppliers();
      console.log(supplierData);
    } catch (error) {
      console.log("error", error);
      toast.error("Something Went Wrong");
    }
  };
  //add supplier
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddSupplier({ ...addSupplier, [name]: value });
  };

  //view Supplier BY id
  const [viewing, setViewing] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  //get customer details by id
  const viewSupplier = async (id) => {
    try {
      debugger;
      const result = await getSuppluerById(id);
      setViewing(result);
      setViewModalVisible(true);
    } catch (error) {
      console.error("Failed in getting Supplier details", error);
    }
  };

  //edit supplier
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const editSupplierData = async (supplierData) => {
    try {
      await updateSupplier(editing._id, supplierData);
      console.log(supplierData);
      setModal(false);
      getAllSuppliers();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };
  //delete supplier
  const removeSupplier = async (id) => {
    try {
      await deleteSupplier(id);
      getAllSuppliers();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "SupplierName",
      key: "SupplierName",
      responsive: ["sm"],
    },
    {
      title: "Company Name",
      dataIndex: "SupplierCompanyName",
      key: "SupplierCompanyName",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "SupplierEmail",
      key: "SupplierEmail",
      responsive: ["sm"],
    },
    {
      title: "Contact Info",
      dataIndex: "SupplierContactInfo",
      key: "SupplierContactInfo",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view Supplier details */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              viewSupplier(record._id);
            }}
          >
            <EyeOutlined />
          </button>
          {/* edit Supplier */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditing(record);
              setModal(true);
            }}
          >
            <EditOutlined />
          </button>
          {/* delete Supplier */}
          <button
            className="hover:text-red-700"
            onClick={() => {
              removeSupplier(record._id);
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
        <AddSuppliers
          supplier={addSupplier}
          addSupplier={AddSupplierHandle}
          handleInputChange={handleInputChange}
        />
      </div>
      <Table
        rowClassName="text-[1rem] text-center"
        bordered={true}
        columns={columns}
        size="large"
        dataSource={supplier}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
      {viewing && (
        <ViewSupplierDetails
          visible={viewModalVisible}
          supplierDets={viewing}
          onClose={() => {
            setViewModalVisible(false);
          }}
        />
      )}
      {editing && (
        <EditSupplier
          visible={modal}
          onClose={() => {
            setModal(false);
          }}
          edit={editing}
          onSubmit={editSupplierData}
        />
      )}
    </>
  );
};

export default SupplierData;
