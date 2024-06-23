import React, { Children, useState } from 'react';
import logo from "../../pages/Home/logo.svg"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  AreaChartOutlined,
  UserOutlined,
  AppstoreAddOutlined ,
  UsergroupAddOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';


import { Button, Layout, Menu, theme } from 'antd';
import ButtonInfo from '../buttons/Button';
import { Link } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='bg-sky-900 flex flex-col items-center justify-center h-[5rem]'>
          <img src={logo} alt="logo" />
          <h1 className='font-[grifter] text-[--light-blue]'>INVENTRA</h1>
          </div>
        <div className="demo-logo-vertical" />
        <Menu 
          className='font-[Sans]'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key='/Dashboard' icon={<AreaChartOutlined />}>
            <Link to="/Dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/Product" icon={<AppstoreAddOutlined />}>
            <Link to="/Product">Add Product</Link>
          </Menu.Item>
          <Menu.Item key="/Invoice" icon={<FileDoneOutlined />}>
            <Link to="/Invoice">Invoice</Link>
          </Menu.Item>
          <Menu.Item key="/Users" icon={<UsergroupAddOutlined />}>
            <Link to="/Users">Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="/Profile" icon={<UserOutlined/>}>
            <Link to="/Profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
        className='flex justify-between px-4'
          style={{
            margin : "0 1rem",
            borderRadius: borderRadiusLG,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '1rem',
              width: 64,
              height: 64,
            }}
          />
          <div className='flex'>
            <h1 className='text-black text-2xl]'>Welcome, </h1>
            <span className='text-[#1677FF]'>Name</span>
          </div>
          <ButtonInfo />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
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