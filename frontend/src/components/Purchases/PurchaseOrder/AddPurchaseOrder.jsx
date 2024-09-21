import { Button, Form, Input, Modal, Select, Radio, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSuppliers } from "./../../../services/SuppliersService";
import { api_url } from "../../../App";

const generatePurchaseOrderNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `PO-${randomNumber}`;
};

const AddPurchaseOrder = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        if (response) {
          setSuppliers(response);
        } else {
          throw new Error("Failed to fetch suppliers");
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api_url}/api/products/`);
        if (response.data) {
          setProducts(response.data);
          console.log(response.data);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSuppliers();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ purchaseOrderNumber: generatePurchaseOrderNumber() });
    }
  }, [visible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const populatedItems = values.items.map((item) => {
          const product = products.find((prod) => prod._id === item.productId);
          const unitPrice = product ? product.price : 0;
          const totalPrice = unitPrice * item.quantity;
          return {
            ...item,
            unitPrice,
            totalPrice,
          };
        });

        const calculatedTotalAmount = populatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        const payload = {
          purchaseOrderNumber: values.purchaseOrderNumber,
          supplier: values.supplier,
          orderDate: values.orderDate,
          items: populatedItems,
          totalAmount: calculatedTotalAmount,
          deliveryDate: values.deliveryDate,
          status: values.status,
        };

        onSubmit(payload);
        form.resetFields();
        setTotalAmount(0);
        form.setFieldsValue({ purchaseOrderNumber: generatePurchaseOrderNumber() });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Add Purchase Order"
      onCancel={(e) => handleClose(e)}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={(e) => handleClose(e)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="purchaseOrderNumber"
          label="Purchase Order Number"
          rules={[{ required: true, message: "Please enter Purchase Order number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="supplier"
          label="Supplier"
          rules={[{ required: true, message: "Please select supplier!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {suppliers.map((supplier) => (
              <Select.Option key={supplier._id} value={supplier.SupplierName}>
                {supplier.SupplierName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "productId"]}
                    fieldKey={[fieldKey, "productId"]}
                    label="Product"
                    rules={[{ required: true, message: "Missing product" }]}
                  >
                    <Select placeholder="Select Product">
                      {products.map((product) => (
                        <Select.Option key={product._id} value={product.productId}>
                          {product.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "quantity"]}
                    fieldKey={[fieldKey, "quantity"]}
                    label="Quantity"
                    rules={[{ required: true, message: "Missing quantity" }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Product
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Radio.Group>
            <Radio value="Pending">Pending</Radio>
            <Radio value="Paid">Paid</Radio>
            <Radio value="Cancelled">Cancelled</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="orderDate"
          label="Order Date"
          rules={[{ required: true, message: "Please select Order date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="deliveryDate"
          label="Expected Delivery Date"
          rules={[{ required: true, message: "Please select Expected Delivery date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Total Amount">
          <Input value={totalAmount} readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPurchaseOrder;
