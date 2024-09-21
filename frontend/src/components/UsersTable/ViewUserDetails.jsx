import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { api_url } from './../../App';

const ViewUserDetails = ({ visible, onClose, user }) => {
  return (
    <Modal
      width={'50rem'}
      open={visible}
      title={<h2 className="text-black font-[grifter] ">User Details</h2>}
      onCancel={onClose}
      footer={null}
    >
      <div className="flex items-center justify-between ">
        <div className="image h-44 w-[25em] flex">
          <p className="text-black font-[Sans] font-semibold text-[1rem]">Profile Image:</p>
          {user.photo && (
            <>
              <img
                className="w-full h-[30vh] border-4"
                src={`${api_url}/public/${user.photo}`}
                alt={`user profile:${user.name}`}
              /*  style={{ width: "100%" , height : '20vh' , objectFit : 'contain'}} */
              />
            </>
          )}
        </div>
        <div key={user._id} className=" font-[Sans] text-[1rem]">
          <p className="text-black">
            <strong>UserName:</strong> {user.name}
          </p>
          <p className="text-black">
            <strong>User Email:</strong> {user.email}
          </p>
          <p className="text-black">
            <strong>Contact Info:</strong> {user.phoneNumber}
          </p>
          <p className="text-black">
            <strong>Role:</strong> {user.role}
          </p>
          <p className="text-black">
            <strong>User Bio:</strong> {user.bio}
          </p>
          <p className="text-black">
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString('en-IN')}
          </p>
          <p className="text-black">
            <strong>Updated At:</strong>
            {new Date(user.updatedAt).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserDetails;
