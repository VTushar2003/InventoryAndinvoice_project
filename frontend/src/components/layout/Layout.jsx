import React, { useEffect, useState } from 'react';
import logo from "../../pages/Home/logo.svg";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin } from "antd";
import ButtonInfo from "../buttons/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectName,
  SET_NAME,
  SET_USER,
} from "../../redux/auth/AuthReducer";
import { getUser } from "../../services/Authservice";
import Loading from '../Loading/Loading';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await getUser();
        dispatch(SET_USER(data));
        dispatch(SET_NAME(data.name));
        setUser(data);
      } catch (error) {
        console.error("Error fetching user");
      }
    }
    getUserData();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      key: "/Sales",
      icon: <FileDoneOutlined />,
      label: "Sales",
      children: [
        {
          key: "/Sales/Customers",
          label: <Link to="/Customers">Customers</Link>,
        },
        {
          key: "/Sales/Invoice",
          label: <Link to="/Invoices">Invoice</Link>,
        },
      ],
    },
    {
      key: "/Purchases",
      icon: <ShoppingOutlined />,
      label: "Purchases",
      children: [
        {
          key: "/Purchases/Suppliers",
          label: <Link to="/Suppliers">Suppliers</Link>,
        },
        /*  {
           key: "/Purchases/Purchase Order",
           label: <Link to="/PurchaseOrder">Purchase order</Link>,
         }, */
      ],
    },
    user && user.role === "admin" && {
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="flex-shrink-0"
      >
        <div className="bg-sky-900 flex flex-col items-center justify-center h-[5rem]">
          {isLoggedIn && (
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          )}
          <h1 className="font-[grifter] text-[--light-blue]">INVENTRA</h1>
        </div>
        <div className="menu-container">
          <Menu
            className="font-[Sans]"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={menuItems}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          className="flex justify-between items-center"
          style={{
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
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-black text-[1.32rem] font-thin">Welcome, </h1>
            <span className="text-[--light-blue] text-[1.32rem]">{name}</span>
          </div>
          <ButtonInfo />
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: "white",
            borderRadius: borderRadiusLG,
          }}
          className="overflow-auto"
        >
          {loading ? (
            <div className="flex-col gap-4 w-full h-full flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            children
          )}
        </Content>
      </Layout>

      <style jsx="true">{`
        .menu-container {
          height: calc(100vh - 5rem); /* Adjust the height to fill the remaining space */
          overflow-y: auto;
        }

        @media (min-width: 768px) {
          .menu-container {
            overflow-y: visible;
          }
        }
      `}</style>
    </Layout>
  );
};

export default DefaultLayout;
