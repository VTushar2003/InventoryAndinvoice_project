import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

const EditUser = ({ visible, onClose, onSubmit, user }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      if (user.photo) {
        setFileList([
          {
            name: user.photo,
            status: "done",
            thumbUrl: `http://localhost:3000/public/${user.photo}`,
          },
        ]);
      }
    }
  }, [user, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));
        if (fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("photo", fileList[0].originFileObj);
        }
        onSubmit(formData);
        setFileList([]);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      open={visible}
      title="Edit UserDetails"
      onCancel={onClose}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={user}>
        <Form.Item label="Profile Image">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: "Please enter the username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Contact Info"
          rules={[{ required: true, message: "Please enter the phone number!" }]}
        >
          <Space>
            <Input style={{ width: "20%" }} defaultValue="+91" />
            <Input style={{ width: "80%" }} />
          </Space>
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true }]} label="User Role">
          <Select placeholder="Select a role" value={user.role}>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item name="bio" label="User Bio">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;
