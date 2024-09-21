import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditUser from "./EditUser";
import { selectUser, updateUserData } from "../../redux/auth/AuthReducer";
import ViewUserDetails from "./ViewUserDetails";
import toast from "react-hot-toast";
import AdduserData from "./AdduserData";
import { api_url } from './../../App';

const UsersTable = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [users, setUsers] = useState([]);

  //view user data
  const [viewuser, setViewuser] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  //edting user data
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editinguser, setEditinguser] = useState(null);

  //base user url
  const UserBaseUrl = `${api_url}/api/usersDetails`;

  //fetch all users from the database
  const getAllUsers = async () => {

    try {
      const res = await axios.get(`${UserBaseUrl}/getallusers`);
      const filterCurrentUser = res.data.filter(
        (user) => user._id !== currentUser._id
      );
      const UsersKeys = filterCurrentUser.map((user, index) => ({
        ...user,
        key: user._id || index,
      }));
      setUsers(UsersKeys);
      console.log(res.data);
    } catch (error) {
      console.log("Error Fetching Products", error);
    }
  };
  useEffect(() => {
    if (currentUser._id) {
      getAllUsers();
    }
  }, [currentUser._id]);
  useEffect(() => {
    getAllUsers();
  }, []);

  //delete user (admin only)
  const DeleteUser = async (_id) => {
    try {
      const data = await axios.delete(`${UserBaseUrl}/deleteUser/${_id}`);
      console.log("user deleted success", data);
      toast.success(`User deleted successfully`);
      getAllUsers();
    } catch (error) {
      console.log("error deleting user", error);
    }
  };

  //edit user details
  const EditUserData = async (formData) => {
    ;
    try {
      await dispatch(updateUserData({ _id: editinguser._id, formData }));
      console.log(formData);
      setEditModalVisible(false);
      getAllUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  //view user details
  const ViewUserDetail = async (_id) => {
    try {
      const result = await axios.get(
        `${api_url}/api/usersDetails/getuser/${_id}`
      );
      setViewuser(result.data);
      setViewModalVisible(true);
      console.log("user details :", result.data);
    } catch (error) {
      console.error("Failed in getting product data", error);
    }
  };
  //refresh after add
  const RefrershAfterAdd = async () => {
    try {
      getAllUsers();
      console.log("Refresh");
    } catch (error) {
      console.log(error);
    }
  };

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

          <button
            className="hover:text-blue-500"
            onClick={() => {
              ViewUserDetail(record._id);
            }}
          >
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
          <button
            className="hover:text-red-500"
            onClick={() => DeleteUser(record._id)}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-[1rem]">
        <AdduserData onUserAdded={RefrershAfterAdd} />
      </div>
      <Table
        bordered={true}
        columns={columns}
        dataSource={users}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20"],
        }}
      />
      {viewuser && (
        <ViewUserDetails
          visible={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          user={viewuser}
        />
      )}
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
