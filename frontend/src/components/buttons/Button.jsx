import React from "react";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/AuthReducer";

const ButtonInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout function
  const handleMenuClick = async ({ key }) => {
    if (key === "1") {
      navigate("/editprofile");
    }
    if (key === "2") {
      navigate("/ChangePassword");
    }
    if (key === "3") {
      // Logout
      try {
        await axios.get("http://localhost:3000/api/usersDetails/logout");
        dispatch(SET_LOGIN(false));
        dispatch(SET_NAME(""));
        localStorage.removeItem("name");
        toast.success("Logged out successfully");
        navigate("/login");
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    }
  };

  const menuProps = {
    items: [
      {
        label: "Edit profile",
        key: "1",
        icon: <UserOutlined />,
      },
      {
        label: "Change Password",
        key: "2",
        icon: <UserOutlined />,
      },
      {
        label: "Logout",
        key: "3",
        icon: <UserOutlined />,
        danger: true,
      },
    ],
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown.Button
        className="font-[Sans]"
        menu={menuProps}
        placement="bottom"
        icon={<SettingOutlined />}
      >
        Settings
      </Dropdown.Button>
    </Space>
  );
};

export default ButtonInfo;
