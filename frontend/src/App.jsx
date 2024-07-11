import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import RegisterAdmin from "./pages/Register/RegisterAdmin";
import LoginUser from "./pages/Register/LoginUser";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "./redux/auth/AuthReducer";
import { getLoginStatus } from "./services/Authservice";
import EditUserProfile from "./components/UsersTable/EditUserProfile";
import Customer from "./pages/Sales/Customer";
import Invoice from "./pages/Sales/Invoice";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
      console.log("login status", status);
    }
    loginStatus();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterAdmin />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Customers" element={<Customer />} />
          <Route path="/Invoices" element={<Invoice />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/editprofile" element={<EditUserProfile />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
