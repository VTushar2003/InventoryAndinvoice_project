import { Button, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";

const EditSupplier = ({ visible, onClose, onSubmit, edit }) => {
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
    <>
      <Modal
        open={visible}
        title="Edit Supplier"
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
            name="SupplierName"
            label="Supplier Name"
            rules={[{ required: true, message: "Please enter supplier Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SupplierCompanyName"
            label="Company name"
            rules={[{ required: true, message: "Please enter Company name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SupplierEmail"
            label="Email"
            rules={[{ required: true, message: "Please enter Email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="SupplierContactInfo"
            label="Contact Info"
            rules={[{ required: true, message: "Please enter Contact Info!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="SupplierAddress" label="Address">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditSupplier;
