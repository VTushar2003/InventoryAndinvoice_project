import React, { useState } from "react";
import { Button, Modal, Upload, Input } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const { TextArea } = Input; 
const ProductForm = ({
  product,
  description,
  setDescription,
  handleInputchange,
  handleImageChange,
  saveProduct,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    if (
      !product.productId ||
      !product.name ||
      !product.category ||
      !product.quantity ||
      !product.price ||
      !product.supplier ||
      !description
    ) {
      toast.error("Fill Required Fields");
      return;
    } else {
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      saveProduct(e);
    }
  };

  const handleCancel = () => {
    setOpen(false);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOk(e);
          }}
          className="flex flex-col gap-2 font-[Sans] font-medium"
        >
          <label>
            Upload Image <span>Support Formats : jpg,jpeg,png</span>
          </label>

          <input className="file" type="file" onChange={handleImageChange}/>
          <label>Enter Product Id</label>
          <Input
            placeholder="Enter Product Id"
            type="text"
            name="productId"
            value={product.productId}
            onChange={handleInputchange}
          />
          <label>Enter Product Name</label>
          <Input
            placeholder="Enter Product Name"
            type="text"
            value={product.name}
            name="name"
            onChange={handleInputchange}
          />
          <label>Enter Product Category</label>
          <Input
            placeholder="Enter Product Category"
            type="text"
            value={product.category}
            name="category"
            onChange={handleInputchange}
          />
          <label>Enter Quantity</label>
          <Input
            placeholder="Enter Quantity"
            type="number"
            value={product.quantity}
            name="quantity"
            onChange={handleInputchange}
          />
          <label>Enter Price</label>
          <Input
            prefix="Rs"
            type="number"
            suffix="RUPEE"
            placeholder="Enter Price"
            name="price"
            onChange={handleInputchange}
            value={product.price}
          />
          <label>Enter Supplier Name</label>
          <Input
            placeholder="Enter Supplier Name"
            type="text"
            onChange={handleInputchange}
            name="supplier"
            value={product.supplier}
          />
          <label htmlFor="Description">Description</label>
          <TextArea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            showCount
            maxLength={200}
            placeholder="disable resize"
            style={{
              height: 120,
              resize: "none",
              marginBottom: "1rem",
            }}
          />
        </form>
      </Modal>
    </>
  );
};

export default ProductForm;
