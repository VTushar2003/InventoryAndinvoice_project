import { Button, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
const { Option } = Select;
const AddUser = ({ user, handleInputChange, handleRoleChange, CreateUser }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = (e) => {
    if (!user.name || !user.email || !user.password || !user.role) {
      return toast.error("All fields are required");
    }
    if (user.password.length < 6) {
      return toast.error("password must be upto 6 characters");
    }
    setConfirmLoading(true);
    setTimeout(() => {
      CreateUser(e);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined />
        Create user
      </Button>
      <Modal
        title={<h1 className="text-black font-serif font-bold">Add User</h1>}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form className="flex flex-col gap-2 font-[Sans] font-medium">
          <label>Enter UserName</label>
          <Input
            placeholder="Enter Username"
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
          <label>Enter user Email</label>
          <Input
            placeholder="Enter Email"
            type="text"
            value={user.email}
            name="email"
            onChange={handleInputChange}
          />
          <label>Enter password</label>
          <Input
            placeholder="Enter Password"
            type="text"
            value={user.password}
            name="password"
            onChange={handleInputChange}
          />
          <label>Select Role</label>
          <Select
            placeholder="Select a role"
            value={user.role}
            onChange={handleRoleChange}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </form>
      </Modal>
    </>
  );
};

export default AddUser;
