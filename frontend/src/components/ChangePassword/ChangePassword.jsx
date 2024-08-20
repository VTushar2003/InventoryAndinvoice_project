import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { changePassword } from "./../../services/Authservice";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;

  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const changePass = async (e) => {
    if (password !== password2) {
      return toast.error("New passwords do not match");
    }

    const formData = {
      oldPassword,
      password,
    };
    await changePassword(formData);
    toast.success("Password Changed!");
    navigate("/Profile");
  };
  const onCancel = () => {
    navigate("/Profile");
  };

  return (
    <DefaultLayout>
      <div>
        <>
          <Form
            form={form}
            onFinish={changePass}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.Item
              name="oldPassword"
              label="Old Password"
              rules={[
                { required: true, message: "Please enter your old password" },
              ]}
            >
              <Input.Password
                placeholder="Old Password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              label="Confirm New Password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password",
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm New Password"
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
            </Form.Item>
            <div className="flex items-center bg-white justify-center w-full">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button htmlType="button" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </>
      </div>
    </DefaultLayout>
  );
};

export default ChangePassword;
