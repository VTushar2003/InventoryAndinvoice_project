import React, { useEffect, useState } from "react";
import DefaultLayout from "./../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserData } from "../../redux/auth/AuthReducer";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { updateUser } from "../../services/Authservice";
import toast from "react-hot-toast";

const EditUserProfile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(user);
  const { email ,_id} = user;

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
  }, [email, navigate, form, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const saveProfile = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("bio", values.bio);

      if (fileList[0] && fileList[0].originFileObj) {
        formData.append("photo", fileList[0].originFileObj);
      }
      await dispatch(updateUserData({_id,formData}));
      toast.success("User details updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <DefaultLayout>
      <Form form={form} labelCol={{ span: 6 }} onFinish={saveProfile} wrapperCol={{ span: 14 }}>
        <Form.Item label="Profile Image">
          <Upload
            listType="picture"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: "Please enter the username!" }]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Contact Info"
          rules={[
            { required: true, message: "Please enter the phone number!" },
          ]}
        >
          <Input onChange={handleInputChange} />
        </Form.Item>
        <Form.Item name="bio" label="User Bio">
          <Input.TextArea onChange={handleInputChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save Profile
          </Button>
        </Form.Item>
      </Form>
    </DefaultLayout>
  );
};

export default EditUserProfile;
