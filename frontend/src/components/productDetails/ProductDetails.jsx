import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ visible, onClose, product }) => {
  return (
    <Modal
      width={'50rem'}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Product Details</h2>}
      onCancel={onClose}
      footer={null}
    >
        <div  key={product._id} className="flex items-center justify-between ">
          <div className="image h-44 w-[25em] flex">
            <p className="text-black font-[Sans] font-semibold text-[1rem]">Image:</p>
            {product.image && (
              <>
                <img
                  className="w-full h-[30vh] object-cover border-4"
                  src={`http://localhost:3000/upload/${product.image}`}
                  alt={`product Name:${product.name}`}
                 /*  style={{ width: "100%" , height : '20vh' , objectFit : 'contain'}} */
                />
              </>
            )}
          </div>
          <div className=" font-[Sans] text-[1rem]">
          <p className="text-black">
            <strong>Product ID:</strong> {product.productId}
          </p>
          <p className="text-black">
            <strong>Name:</strong> {product.name}
          </p>
          <p className="text-black">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-black">
            <strong>Quantity: <span className="font-normal" style={{color : product.quantity > 10 ? 'green' : "red"}}>{product.quantity}</span></strong>
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
          </p>
          </div>
        </div>
    </Modal>
  );
};

export default ProductDetails;
