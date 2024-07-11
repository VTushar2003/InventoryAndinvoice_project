import { Modal, Table, Collapse } from "antd";
import React, { useEffect, useState } from "react";
const { Panel } = Collapse;
const CustomerDetails = ({ visible, onClose, customerDets }) => {
  return (
    <Modal
      width={"50rem"}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">Customer Details</h2>}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex items-center justify-between ">
        <div key={customerDets.id} className=" font-[Sans] text-[1rem]">
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
            <strong>Created At:</strong>
            {new Date(customerDets.createdAt).toLocaleString("en-IN")}
          </p>
          <p className="text-black">
            <strong>Updated At:</strong>
            {new Date(customerDets.updatedAt).toLocaleString("en-IN")}
          </p>
          <div className="invoices mt-4">
            <h3 className="text-black font-bold mb-2">Invoices:</h3>
            <Collapse accordion>
              <Panel header="View Invoices" key="1">
                <Table
                  /*   rowKey="_id"
                  columns={columns}
                  dataSource={invoices} */
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetails;
