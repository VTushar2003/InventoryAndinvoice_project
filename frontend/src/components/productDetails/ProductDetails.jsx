import { Drawer, Modal } from "antd";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ visible, onClose, product }) => {

  const { productId, name, category, quantity, description, user, updatedAt, createdAt } = product;
  

  return (
    <Drawer
      closable={true}
      width={"40rem"}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Product Details</h2>}
      onClose={onClose}
      footer={null}
    >
      <div key={product._id} className="flex-col flex items-center bg-red-500">
        <div className="image h-48 w-[25em]">
          {product.image && (
            <>
              <img
                className="w-full h-48 object-cover border-4"
                src={`http://localhost:3000/upload/${product.image}`}
                alt={`product Name:${product.name}`}
              />
            </>
          )}
        </div>
        <div className=" bg-gray-600 font-[Sans] text-[1rem]">
          <table className="border">
            <thead>
              <tr>
                <th>ProductID</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>{productId}</td></tr>
            </tbody>
          </table>

          {/* <p className="text-black">
            <strong>Product ID:</strong> {product.productId}
          </p>
          <p className="text-black">
            <strong>Name:</strong> {product.name}
          </p>
          <p className="text-black">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-black">
            <strong>Quantity: <span className="font-normal" style={{ color: product.quantity > 10 ? 'green' : "red" }}>{product.quantity}</span></strong>
          </p>
          <p className="text-black">
            <strong>Price:</strong> {product.price}
          </p>
          <p className="text-black">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="text-black">
            <strong>Supplier:</strong> {product.supplier}
          </p>
          <p className="text-black">
            <strong>Created At:</strong>
            {new Date(product.createdAt).toLocaleString('en-IN')}
          </p>
          <p className="text-black">
            <strong>Updated At:</strong>
            {new Date(product.updatedAt).toLocaleString('en-IN')}
          </p>
          <p className="text-black">
            <strong>Created By:</strong> {product.user && product.user.name ? product.user.name : 'user not found'}
          </p> */}
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDetails;
