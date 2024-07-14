import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const CustomerDetails = ({ visible, onClose, customerDets }) => {
  return (
    <Modal
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Customer Details</h2>}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex items-center justify-between">
        <div key={customerDets.id} className="font-[Sans] text-[1rem]">
          <p className="text-black">
            <strong>Customer Type:</strong> {customerDets.customerType}
          </p>
          <p className="text-black">
            <strong>Customer Name:</strong> {customerDets.CustomerName}
          </p>
          <p className="text-black">
            <strong>Company name:</strong> {customerDets.companyName}
          </p>
          <p className="text-black">
            <strong>Email:</strong> {customerDets.customerEmail}
          </p>
          <p className="text-black">
            <strong>Contact Info:</strong> {customerDets.customerContactInfo}
          </p>
          <p className="text-black">
            <strong>Address:</strong> {customerDets.CustomerAddress}
          </p>
          <p className="text-black">
            <strong>Created At:</strong>{" "}
            {new Date(customerDets.createdAt).toLocaleString("en-IN")}
          </p>
          <p className="text-black">
            <strong>Updated At:</strong>{" "}
            {new Date(customerDets.updatedAt).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetails;
