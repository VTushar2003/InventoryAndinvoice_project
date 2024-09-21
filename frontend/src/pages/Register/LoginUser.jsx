import { Form, Input, Button } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_LOGIN,
  SET_NAME,
  selectIsLoggedIn,
} from "../../redux/auth/AuthReducer";
import toast from "react-hot-toast";
import "./form.css";
import { api_url } from './../../App';

const initialState = {
  email: "",
  password: "",
};

const LoginUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async () => {
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${api_url}/api/usersDetails/login`,
        userData
      );
      const data = response.data; // Destructure the data from the response object

      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      toast.success("Login Successful");
      navigate("/Dashboard");
    } catch (error) {
      toast.error("Please enter valid Details!");
      console.error(error);
    }
  };

  return (
    <>
      <div className="register h-screen flex items-center justify-center bg-[#F7F7F7]">
        <Form className="form" onFinish={login}>
          <p className="title">Login</p>
          <p className="message">Sign in now and get full access to our app.</p>
          <label>
            <Form.Item rules={[{ required: true }]} label="Email">
              <Input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </Form.Item>
          </label>
          <label>
            <Form.Item rules={[{ required: true }]} label="Password">
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Item>
          </label>
          <Button type="primary" htmlType="submit" className="submit">
            Login
          </Button>
          <div className="flex items-center justify-center">
            <p className="signin">
              Do not have an account? <Link to="/register">SignUp</Link>
            </p>
            <p className="signin">
              <Link to="/">Home</Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginUser;
