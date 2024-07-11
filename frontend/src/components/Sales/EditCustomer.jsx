import { Button, Form, Input, Modal } from "antd";
import { Radio } from "antd";
import React, { useEffect, useState } from "react";

const EditCustomer = ({ visible, onClose, onSubmit, edit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (edit) {
      form.setFieldsValue(edit);
    }
  }, [edit, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Edit Customer"
      onCancel={onClose}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={edit}>
        <Form.Item
          label="Select Customer Type"
          name="customerType"
          rules={[{ required: true, message: "Please select customer type" }]}
        >
          <Radio.Group>
            <Radio value="business">Business</Radio>
            <Radio value="individual">Individual</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="CustomerName"
          label="Customer Name"
          rules={[
            { required: true, message: "Please enter Customer Name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Company name"
          rules={[
            { required: true, message: "Please enter Company name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerEmail"
          label="Email"
          rules={[
            { required: true, message: "Please enter Email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerContactInfo"
          label="Contact Info"
          rules={[
            { required: true, message: "Please enter Contact Info!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="CustomerAddress" label="Address">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCustomer;
