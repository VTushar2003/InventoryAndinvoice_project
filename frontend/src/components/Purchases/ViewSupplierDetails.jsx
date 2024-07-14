import { Modal } from "antd";
import React from "react";

const ViewSupplierDetails = ({ visible, onClose, supplierDets }) => {
  return (
    <>
      <Modal
        open={visible}
        title={<h2 className="text-black font-[grifter] ">Supplier Details</h2>}
        onCancel={onClose}
        footer={null}
      >
        <div className="flex items-center justify-between">
          <div key={supplierDets.id} className="font-[Sans] text-[1rem]">
            <p className="text-black">
              <strong>Supplier Name:</strong> {supplierDets.SupplierName}
            </p>
            <p className="text-black">
              <strong>Company name:</strong> {supplierDets.SupplierCompanyName}
            </p>
            <p className="text-black">
              <strong>Email:</strong> {supplierDets.SupplierEmail}
            </p>
            <p className="text-black">
              <strong>Contact Info:</strong> {supplierDets.SupplierContactInfo}
            </p>
            <p className="text-black">
              <strong>Address:</strong> {supplierDets.SupplierAddress}
            </p>
            <p className="text-black">
              <strong>Created At:</strong>{" "}
              {new Date(supplierDets.createdAt).toLocaleString("en-IN")}
            </p>
            <p className="text-black">
              <strong>Updated At:</strong>{" "}
              {new Date(supplierDets.updatedAt).toLocaleString("en-IN")}
            </p>
            <p className="text-black">
              <strong>Created By:</strong> {supplierDets.user.name}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewSupplierDetails;
