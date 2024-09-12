import { Drawer, Flex, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Row } from 'antd';

const ProductDetails = ({ visible, onClose, product }) => {

  const { productId, name, category, quantity, description, supplier, user, updatedAt, createdAt } = product;


  return (
    <Drawer
      closable={true}
      width={"30rem"}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Product Details</h2>}
      onClose={onClose}
      footer={null}
    >
      <div key={product._id} className="flex-col flex items-center">
        <div className="image h-48 w-[30em]">
          {product.image && (
            <>
              <img
                className="w-full h-48 object-contain"
                src={`http://localhost:3000/upload/${product.image}`}
                alt={`product Name:${product.name}`}
              />
            </>
          )}
        </div>
        <Row className=" items-center mt-3 text-center rounded-lg">
          <Col span={12} className="border p-2 border-gray-400 bg-[--light-blue] rounded-tl-lg">
            <p className=" text-white">
              <strong>Product ID:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 rounded-tr-lg hover:bg-gray-100">
            {productId}
          </Col>

          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400" >
            <p className='text-white'>
              <strong>Product Name:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{name}</Col>

          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>Category:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{category}</Col>

          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>Quantity:</strong>
            </p>
          </Col>
          <Col span={12} style={{ color: product.quantity > 10 ? 'green' : "red" }} className="border p-2 border-gray-400 hover:bg-gray-100">{quantity}</Col>
          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>Supplier:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{supplier}</Col>
          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>Description:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{description}</Col>
          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>User:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{user && user.name ? user.name : 'user not found'}</Col>

          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
            <p className='text-white'>
              <strong>Created At:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">    {new Date(createdAt).toLocaleString('en-IN')}</Col>
          <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400 rounded-bl-lg">
            <p className='text-white'>
              <strong>Updated At:</strong>
            </p>
          </Col>
          <Col span={12} className="border p-2 border-gray-400 rounded-br-lg hover:bg-gray-100">{new Date(updatedAt).toLocaleString('en-IN')}</Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default ProductDetails;
