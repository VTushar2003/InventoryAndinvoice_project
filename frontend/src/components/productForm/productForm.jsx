import React, { useState } from "react";
import { Button, Modal, Upload, Input, Form } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const { TextArea } = Input;

const ProductForm = ({
  product,
  description,
  setDescription,
  handleInputchange,
  handleImageChange,
  productImage,
  saveProduct,
  isProductIdUnique,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      if(!isProductIdUnique(product.productId)){
        form.setFields([
          {
            name : 'productId',
            errors : ["product Id must be unique!"]
          }
        ]);
        return;
      }
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      await saveProduct();
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields()
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} must be a valid number!",
    },
    string: {
      range: "${label} must be between ${min} and ${max} characters long.",
    },
  };

  const customRules = {
    validateImage: () => {
      console.log(productImage)
      if (productImage.length === 0 ) {
        return Promise.reject("Image is required!");
      }
      return Promise.resolve();
    },
    validatePositiveNumber: (_, value) => {
      if (value < 0) {
        return Promise.reject("Must be a positive number!");
      }
      return Promise.resolve();
    },
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Add Product
      </Button>
      <Modal
        title={<h1 className="text-black font-serif font-bold">Add Product</h1>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={handleOk}
          validateMessages={validateMessages}
          className="flex flex-col gap-2 font-[Sans] font-medium"
        >
          <label>
            Upload Image <span>Support Formats : jpg, jpeg, png</span>
          </label>
          <Form.Item
            name="image"
            valuePropName="filelist"
            getValueFromEvent={(e)=>e.filelist}
            rules={[{ validator: customRules.validateImage }]}
          >
             <input className="file" max={1} type="file" onChange={handleImageChange}/>
          </Form.Item>
          <Form.Item
            name="productId"
            label="Enter Product Id"
            rules={[
              { required: true },
              {
                validator: (_, value) =>
                  isProductIdUnique(value)
                    ? Promise.resolve()
                    : Promise.reject("Product ID must be unique!"),
              },
            ]}
          >
            <Input
              placeholder="Enter Product Id"
              type="text"
              name="productId"
              value={product.productId}
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Enter Product Name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Product Name"
              type="text"
              value={product.name}
              name="name"
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            name="category"
            label="Enter Product Category"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Product Category"
              type="text"
              value={product.category}
              name="category"
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Enter Quantity"
            rules={[
              { required: true },
              {
                validator: customRules.validatePositiveNumber,
              },
            ]}
          >
            <Input
              placeholder="Enter Quantity"
              type="number"
              value={product.quantity}
              name="quantity"
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Enter Price"
            rules={[
              { required: true },
              {
                validator: customRules.validatePositiveNumber,
              },
            ]}
          >
            <Input
              prefix="Rs"
              type="number"
              suffix="RUPEE"
              placeholder="Enter Price"
              name="price"
              onChange={handleInputchange}
              value={product.price}
            />
          </Form.Item>
          <Form.Item
            name="supplier"
            label="Enter Supplier Name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Supplier Name"
              type="text"
              onChange={handleInputchange}
              name="supplier"
              value={product.supplier}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              showCount
              maxLength={200}
              placeholder="Disable resize"
              style={{
                height: 120,
                resize: "none",
                marginBottom: "1rem",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
