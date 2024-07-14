import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const AddSuppliers = ({ supplier, handleInputChange, addSupplier }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const handleOk = async (e) => {
    try {
      await form.validateFields();
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        addSupplier(e);
        setConfirmLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Please fill in all required fields correctly");
    }
  };
  const emailValidator = async (rule, value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Invalid email format");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Add new Supplier
      </Button>
      <Modal
        title={
          <h1 className="text-black font-serif font-bold"> Add new Supplier</h1>
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="addSupplier" onFinish={handleOk}>
          <Form.Item
            label="Enter Supplier Name"
            name="SupplierName"
            rules={[{ required: true, message: "Please enter supplier name" }]}
          >
            <Input
              placeholder="Enter Supplier name"
              name="SupplierName"
              value={supplier.SupplierName}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Company Name"
            name="SupplierCompanyName"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input
              placeholder="Enter Company Name"
              name="SupplierCompanyName"
              value={supplier.SupplierCompanyName}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Customer Email"
            name="SupplierEmail"
            rules={[
              { required: true, message: "Please enter supplier email" },
              { validator: emailValidator },
            ]}
          >
            <Input
              placeholder="Enter Email"
              name="SupplierEmail"
              value={supplier.SupplierEmail}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Contact Number"
            name="SupplierContactInfo"
            rules={[
              {
                required: true,
                message: "Please enter supplier contact number",
              },
            ]}
          >
            <Input
              placeholder="Enter Contact Number"
              name="SupplierContactInfo"
              value={supplier.SupplierContactInfo}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Address"
            name="SupplierAddress"
            rules={[
              { required: true, message: "Please enter supplier address" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter Address"
              name="SupplierAddress"
              value={supplier.SupplierAddress}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSuppliers;
