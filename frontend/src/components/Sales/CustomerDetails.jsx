import { Drawer, Row, Col } from "antd";
import React, { useEffect, useState } from "react";

const CustomerDetails = ({ visible, onClose, customerDets }) => {

  const { customerType, CustomerName, companyName, customerEmail, customerContactInfo, CustomerAddress, totalAmountDue, totalAmountPaid, createdAt, updatedAt } = customerDets
  return (
    <Drawer
      closable={true}
      width={"30rem"}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Customer Details</h2>}
      onClose={onClose}
      footer={null}
    >
      <Row className="w-full items-center mt-3 text-center rounded-lg">
        <Col span={12} className="border p-2 border-gray-400 bg-[--light-blue] rounded-tl-lg">
          <p className=" text-white">
            <strong>Customer Type:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 rounded-tr-lg hover:bg-gray-100">
          {customerType}
        </Col>

        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400" >
          <p className='text-white'>
            <strong>Customer Name:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{CustomerName}</Col>

        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Company Name:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{companyName}</Col>

        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Customer Email:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{customerEmail}</Col>
        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Contact Inforamtion:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{customerContactInfo}</Col>
        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Customer Address:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{CustomerAddress}</Col>
        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Total Amount Due:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{totalAmountDue}</Col>
        <Col span={12} className="border p-2 bg-[--light-blue]  border-gray-400">
          <p className='text-white'>
            <strong>Total Amount Paid:</strong>
          </p>
        </Col>
        <Col span={12} className="border p-2 border-gray-400 hover:bg-gray-100">{totalAmountPaid}</Col>

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
    </Drawer>
  );
};

export default CustomerDetails;
