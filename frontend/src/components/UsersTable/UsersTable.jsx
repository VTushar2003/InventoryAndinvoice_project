import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import EditUser from "./EditUser";
import { updateUserData } from "../../redux/auth/AuthReducer";

const UsersTable = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  //edting user data
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editinguser, setEditinguser] = useState(null);

  //base user url
  const UserBaseUrl = "http://localhost:3000/api/usersDetails";

  //fetch all users from the database
  const getAllUsers = async () => {
    debugger;
    try {
      const res = await axios.get(`${UserBaseUrl}/getallusers`);
      const UsersKeys = res.data.map((user, index) => ({
        ...user,
        key: user._id || index,
      }));
      setUsers(UsersKeys);
      console.log(res.data);
    } catch (error) {
      console.log("Error Fetching Products", error);
    }
  };

  //edit user details
  const EditUserData = async (formData) => {
    debugger;
    try {
      await dispatch(updateUserData({ _id : editinguser._id, formData }));
      console.log(formData)
      setEditModalVisible(false);
      getAllUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
    },
    {
      title: "Contact Info",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      responsive: ["sm"],
    },
    {
      title: "User Role",
      dataIndex: "role",
      key: "role",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view User Detials */}
          <button className="hover:text-blue-500">
            <EyeOutlined />
          </button>
          {/* edit User Details */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditinguser(record);
              setEditModalVisible(true);
            }}
          >
            <EditOutlined />
          </button>
          {/* delete User */}
          <button className="hover:text-red-500">
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={users}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20"],
        }}
      />
      {editinguser && (
        <EditUser
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSubmit={EditUserData}
          user={editinguser}
        />
      )}
    </>
  );
};

export default UsersTable;
