import React from 'react';
import { SettingOutlined, UserOutlined , ArrowRightOutlined} from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const handleMenuClick = (e) => {
  console.log('click', e);
};
const items = [
  {
    label: 'Edit Profile',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Change Password',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: 'Logout ->',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const ButtonInfo = () => (
  <Space wrap>
    <Dropdown.Button className='font-[Sans]' menu={menuProps} placement="bottom" icon={<SettingOutlined />}>
        Settings
    </Dropdown.Button>
  </Space>
);
export default ButtonInfo;
