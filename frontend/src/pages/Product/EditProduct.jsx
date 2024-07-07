import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProduct = ({ visible, onClose, onSubmit, product }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
      if (product.image) {
        setFileList([
          {
            name: product.image,
            status: "done",
            thumbUrl : `http://localhost:3000/upload/${product.image}`
          },
        ]);
      }
    }
  }, [product, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        if (fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("image", fileList[0].originFileObj);
        }
        onSubmit(product.productId,formData);
        setFileList([]);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      open={visible}
      title="Edit Product"
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
      <Form form={form} layout="vertical" initialValues={product}>
        <Form.Item label="Image">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the product name!" },
          ]}
        >
          <Input   />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter the quantity!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="supplier" label="Supplier">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
