import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getSuppliers } from './../../services/SuppliersService';

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
  resetProductId,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [supplier, setSupplier] = useState([]);



  useEffect(() => {
    const SupplierDets = async () => {
      try {
        const response = await getSuppliers();
        if (response) {
          setSupplier(response);
        } else {
          throw new Error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    SupplierDets();
  }, [])

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ product: resetProductId() });
    }
  }, [open]);

  const showModal = () => setOpen(true);

  const handleOk = async () => {
    try {
      await form.validateFields();

      if (!isProductIdUnique(product.productId)) {
        form.setFields([
          {
            name: "productId",
            errors: ["Product ID must be unique!"],
          },
        ]);
        return;
      }

      setConfirmLoading(true);
      setTimeout(() => {
        saveProduct();
        setOpen(false);
        setConfirmLoading(false);
        form.resetFields();
      }, 2000);
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
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
    validateImage: () =>
      productImage.length === 0
        ? Promise.reject("Image is required!")
        : Promise.resolve(),

    validatePositiveNumber: (_, value) =>
      value < 0
        ? Promise.reject("Must be a positive number!")
        : Promise.resolve(),
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
          validateMessages={validateMessages}
          className="flex flex-col gap-2 font-[Sans] font-medium"
        >
          <Form.Item
            label="Upload Image"
            name="image"
            required
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ validator: customRules.validateImage }]}
          >
            <input
              type="file"
              max={1}
              className="file"
              onChange={handleImageChange}
            />
            <span>Support Formats: jpg, jpeg, png</span>
          </Form.Item>
          <Form.Item
            label="Enter Product Id"
            name="productId"
            initialValue={product.productId}
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
            label="Enter Product Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Product Name"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            label="Enter Product Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Product Category"
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            label="Enter Quantity"
            name="quantity"
            rules={[
              { required: true },
              { validator: customRules.validatePositiveNumber },
            ]}
          >
            <Input
              placeholder="Enter Quantity"
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            label="Enter Price"
            name="price"
            rules={[
              { required: true },
              { validator: customRules.validatePositiveNumber },
            ]}
          >
            <Input
              prefix="Rs"
              suffix="RUPEE"
              type="number"
              placeholder="Enter Price"
              name="price"
              value={product.price}
              onChange={handleInputchange}
            />
          </Form.Item>
          <Form.Item
            label="Enter Supplier Name"
            name="supplier"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleInputchange({ target: { name: "supplier", value } })}
            >
              {supplier.map((suppliers) => (
                <Select.Option key={suppliers._id} value={suppliers.SupplierName}>
                  {suppliers.SupplierName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, min: 2, max: 1024 }]}
          >
            <TextArea
              name="description"
              placeholder="Enter the Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength={1024}
              className="font-medium resize"
              style={{ height: 120, resize: "none", marginBottom: "1rem" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductForm;
