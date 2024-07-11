import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Radio } from "antd";

const AddCustomer = ({
  customer,
  handleInputChange,
  handleCustomerType,
  addcustomer,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async (e) => {
    try {
      await validateFields();
      setConfirmLoading(true);
      setTimeout(() => {
        addcustomer(e);
        setOpen(false);
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
        Add New Customer
      </Button>
      <Modal
        title={
          <h1 className="text-black font-serif font-bold">Add New Customer</h1>
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="addCustomerForm" onFinish={handleOk}>
          <Form.Item
            label="Select Customer Type"
            name="customerType"
            rules={[{ required: true, message: "Please select customer type" }]}
          >
            <Radio.Group onChange={handleCustomerType}>
              <Radio value="business">Business</Radio>
              <Radio value="individual">Individual</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Enter Customer Name"
            name="CustomerName"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input
              placeholder="Enter Customer name"
              name="CustomerName"
              value={customer.CustomerName}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Company Name"
            name="companyName"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input
              placeholder="Enter Company Name"
              name="companyName"
              value={customer.companyName}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Customer Email"
            name="customerEmail"
            rules={[
              { required: true, message: "Please enter customer email" },
              { validator: emailValidator },
            ]}
          >
            <Input
              placeholder="Enter Email"
              name="customerEmail"
              value={customer.customerEmail}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Contact Number"
            name="customerContactInfo"
            rules={[
              {
                required: true,
                message: "Please enter customer contact number",
              },
            ]}
          >
            <Input
              placeholder="Enter Contact Number"
              name="customerContactInfo"
              value={customer.customerContactInfo}
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Enter Address"
            name="CustomerAddress"
            rules={[
              { required: true, message: "Please enter customer address" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter Address"
              name="CustomerAddress"
              value={customer.CustomerAddress}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCustomer;
