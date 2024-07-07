import React, { useEffect, useState } from "react";
import logo from "../../pages/Home/logo.svg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import ButtonInfo from "../buttons/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectName, SET_NAME, SET_USER } from "../../redux/auth/AuthReducer";
import { getUser } from "../../services/Authservice";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {

  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await getUser();
        dispatch(SET_USER(data));
        dispatch(SET_NAME(data.name));
        setUser(data);
      } catch (error) {
        console.error("error fetching user");
        toast.error("Something Went Wrong");
      }
    }
    getUserData();
  }, [dispatch]);


  const name = useSelector(selectName);
  const [collapsed, setCollapsed] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/Dashboard",
      icon: <AreaChartOutlined />,
      label: <Link to="/Dashboard">Dashboard</Link>,
    },
    {
      key: "/Product",
      icon: <AppstoreAddOutlined />,
      label: <Link to="/Product">Inventory</Link>,
    },
    {
      key: "/Invoice",
      icon: <FileDoneOutlined />,
      label: <Link to="/Invoice">Invoice</Link>,
    },
     user && user.role === 'admin' && {
      key: "/Users",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/Users">Manage Users</Link>,
    },
    {
      key: "/Profile",
      icon: <UserOutlined />,
      label: <Link to="/Profile">Profile</Link>,
    },
  ];

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="bg-sky-900 flex flex-col items-center justify-center h-[5rem]">
          {isLoggedIn && (
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          )}

          <h1 className="font-[grifter] text-[--light-blue]">INVENTRA</h1>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          className="font-[Sans]"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          className="flex justify-between"
          style={{
            margin: "0 1rem",
            borderRadius: borderRadiusLG,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "1rem",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex w-40">
            <h1 className="text-black text-[1.32rem] font-thin">Welcome, </h1>
            <span className="text-[#1677FF] text-[1.32rem]">{name}</span>
          </div>
          <ButtonInfo />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
