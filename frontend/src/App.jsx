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
import Supplier from "./pages/Purchases/Supplier";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import PurchaseOrder from "./pages/Purchases/PurchaseOrder";
axios.defaults.withCredentials = true;
import { QueryClient, QueryClientProvider } from 'react-query';

export const api_url = import.meta.env.VITE_API_URL

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

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
            <Route path="/Suppliers" element={<Supplier />} />
            <Route path="/PurchaseOrder" element={<PurchaseOrder />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/editprofile" element={<EditUserProfile />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
