import { Button, Form, Input, Modal, Select, Radio, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomers } from "./../../services/CustomerService";
import { api_url } from "../../App";
const generateInvoiceNumber = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `IO-${randomNumber}`;
};

const AddInvoice = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
    form.resetFields();
    setTotalAmount(0);
    setDiscount(0);
    setTax(0);
    setAmountPaid(0);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        if (response) {
          setCustomers(response);
        } else {
          throw new Error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
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

    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ invoiceOrder: generateInvoiceNumber() });
    }
  }, [visible, form]);


  const calculateTotalAmount = (items) => {
    let total = items.reduce((acc, item) => {
      const product = products.find((p) => p.productId === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);

    // Apply discount
    total -= (total * discount) / 100;

    // Apply tax
    total += (total * tax) / 100;

    // Subtract amount paid
    total -= amountPaid;

    setTotalAmount(total);
  };

  useEffect(() => {
    // Recalculate the total when discount, tax, or amount paid changes
    const currentItems = form.getFieldValue("items") || [];
    calculateTotalAmount(currentItems);
  }, [discount, tax, amountPaid, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const payload = {
          customerName: values.customer,
          invoiceOrder: values.invoiceOrder,
          items: values.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          paymentMode: values.paymentMode,
          amountPaid: values.amountPaid,
          discount, // Include discount value
          tax, // Include tax value
          status: values.status,
          invoiceDate: values.invoiceDate,
          dueDate: values.dueDate,
        };
        onSubmit(payload);
        form.resetFields();
        console.log(payload)
        setTotalAmount(0);
        setDiscount(0);
        setTax(0);
        setAmountPaid(0);
        form.setFieldsValue({ invoiceOrder: generateInvoiceNumber() });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Add Invoice"
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
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => {
          if (changedValues.items) {
            calculateTotalAmount(allValues.items);
          }
        }}
      >
        <Form.Item
          name="invoiceOrder"
          label="Invoice Number"
          rules={[{ required: true, message: "Please enter invoice number!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customer"
          label="Customer Name"
          rules={[{ required: true, message: "Please select customer!" }]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {customers.map((customer) => (
              <Select.Option key={customer._id} value={customer.CustomerName}>
                {customer.CustomerName}
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
                        <Select.Option
                          key={product._id}
                          value={product.productId}
                        >
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
          name="paymentMode"
          label="Payment Mode"
          rules={[{ required: true, message: "Please select payment mode!" }]}
        >
          <Radio.Group>
            <Radio value="Debit/Credit">Debit/Credit</Radio>
            <Radio value="Cash">Cash</Radio>
            <Radio value="BNPL">BNPL</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="amountPaid"
          label="Amount Paid"
          initialValue={0}
          rules={[{ required: true, message: "Please enter amount paid!" }]}
        >
          <Input type="number" onChange={(e) => setAmountPaid(Number(e.target.value))} />
        </Form.Item>
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
          name="invoiceDate"
          label="Invoice Date"
          rules={[{ required: true, message: "Please select invoice date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select due date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Discount (%)">
          <Input
            placeholder="%"
            type="number"
            min={0}
            max={100}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
        </Form.Item>

        <Form.Item label="Tax (%)">
          <Select onChange={(value) => setTax(Number(value))}>
            <Select.Option value={0}>0%</Select.Option>
            <Select.Option value={5}>5%</Select.Option>
            <Select.Option value={10}>10%</Select.Option>
            <Select.Option value={15}>15%</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Total Amount">
          <Input value={totalAmount.toFixed(2)} readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddInvoice;
