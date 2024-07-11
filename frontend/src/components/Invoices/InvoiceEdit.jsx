import { Button, Form, Input, Modal, Select } from "antd";
import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../../services/CustomerService";
import { getProducts } from "../../redux/rootReducer";

const InvoiceEdit = ({ visible, onClose, onSubmit, edit }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch customers from MongoDB
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        if (response.ok) {
          setCustomers(response);
        } else {
          throw new Error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    // Fetch products from MongoDB
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.ok) {
          setProducts(response);
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCustomers();
    fetchProducts();

    if (edit) {
      form.setFieldsValue(edit);
    }
  }, [edit, form]);

  // Handle form submission
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
        title="Edit Invoice"
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
            name="invoiceOrder"
            label="Invoice Number"
            rules={[
              { required: true, message: "Please enter invoice number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Customer Name"
            rules={[{ required: true, message: "Please select customer!" }]}
          >
            <Select>
              {customers.map((customer) => (
                <Select.Option key={customer._id} value={customer._id}>
                  {customer.CustomerName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="items"
            label="Products"
            rules={[{ required: true, message: "Please select products!" }]}
          >
            <Select mode="multiple">
              {products.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
            rules={[{ required: true, message: "Please enter amount paid!" }]}
          >
            <Input type="number" />
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
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select due date!" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default InvoiceEdit;
