import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AddUser from "./AddUser";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "",
};
const AdduserData = ({ onUserAdded }) => {
  const [user, setUser] = useState(initialState);
  const { name, email, password, role } = user;

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleRoleChange = (value) => {
    setUser({ ...user, role: value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    const userData = {
      name,
      email,
      password,
      role,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/usersDetails/createUser",
        userData
      );
      toast.success("user created successfully");
      onUserAdded();
    } catch (error) {
      console.log("message", error);
      toast.error("something went wrong , please try again");
    }
  };
  return <>
  <AddUser
    user = {user}
    handleInputChange={handleInputchange}
    handleRoleChange = {handleRoleChange}
    CreateUser={addUser}
  />
  </>;
};

export default AdduserData;
