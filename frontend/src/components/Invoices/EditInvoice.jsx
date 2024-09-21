import { Button, Form, Input, Modal, Select, Radio, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCustomers } from "./../../services/CustomerService";
import { api_url } from "../../App";

const InvoiceEdit = ({ visible, onClose, onSubmit, edit }) => {
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

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
      form.setFieldsValue({
        ...edit,
        invoiceDate: edit.invoiceDate,
        dueDate: edit.dueDate,
        items: edit.items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      });
    }
  }, [edit, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { items } = values;

        // Identify the added items
        const addedItems = items.filter(
          (item) => !edit.items.find((e) => e.product._id === item.productId)
        );

        // Prepare the payload for onSubmit
        const payload = {
          ...values,
          addedItems: addedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          removedItems,
        };

        // Exclude amountPaid if it's not edited
        if (values.amountPaid === edit.amountPaid) {
          delete payload.amountPaid;
        }

        onSubmit(payload);
        form.resetFields();
        setRemovedItems([]); // Reset removed items
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleRemoveItem = (name) => {
    const itemToRemove = form.getFieldValue(["items", name]);
    setRemovedItems([...removedItems, itemToRemove]);
    form.setFieldsValue({
      items: form.getFieldValue("items").filter((_, index) => index !== name),
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...edit,
            amountPaid: edit?.amountPaid !== undefined ? edit.amountPaid : 0,
          }}
        >
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
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {customers.map((customer) => (
                <Select.Option key={customer._id} value={customer._id}>
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
                          <Select.Option key={product._id} value={product._id}>
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
                    <MinusCircleOutlined
                      onClick={() => handleRemoveItem(name)}
                    />
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
            <input type="date" />
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select due date!" }]}
          >
            <input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InvoiceEdit;
