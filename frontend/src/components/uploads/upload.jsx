import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';

const Uploads = () => (
  <Upload accept='.png,.jpg,.jpeg' >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default Uploads;