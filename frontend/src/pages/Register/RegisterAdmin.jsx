import { Form, Input, Select, Button } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./form.css";
import { toast } from "react-hot-toast";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/AuthReducer";

const { Option } = Select;

const RegisterAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });
  const { name, email, password, password2, role } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };
  //checkEmail exist or not
  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/usersDetails/CheckEmail",
        { email }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email", error);
      return false;
    }
  };

  const register = async () => {
    if (!name || !email || !password || !role) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setIsLoading(false);
      return toast.error("Email is already in use");
    }

    const userData = {
      name,
      email,
      password,
      role,
    };
    setIsLoading(true);

    try {
      debugger;
      const response = await axios.post(
        "http://localhost:3000/api/usersDetails/register",
        userData
      );
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(response.data.name));
      setIsLoading(false);
      toast.success("Register Successful");
      navigate("/Dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <div className="register h-screen flex items-center justify-center bg-[#F7F7F7]">
      <Form className="form" onFinish={register}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex">
          <label className="w-full">
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              label="Username"
            >
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </label>
        </div>
        <label>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            label="Email"
          >
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </Form.Item>
        </label>
        <label>
          <Form.Item
            name="password"
            rules={[{ required: true }]}
            label="Password"
          >
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </Form.Item>
        </label>
        <label>
          <Form.Item
            name="password2"
            rules={[{ required: true }]}
            label="Confirm Password"
          >
            <Input
              type="password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </Form.Item>
        </label>
        <label>
          <Form.Item name="role" rules={[{ required: true }]} label="Role">
            <Select
              placeholder="Select a role"
              value={role}
              onChange={handleRoleChange}
            >
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
        </label>
        <Button
          type="primary"
          htmlType="submit"
          className="submit"
          loading={isLoading}
        >
          Register
        </Button>
        <div className="flex items-center justify-center">
          <p className="signin">
            Already have an account? <Link to="/login">Signin</Link>
          </p>
          <p className="signin">
            <Link to="/">Home</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default RegisterAdmin;
