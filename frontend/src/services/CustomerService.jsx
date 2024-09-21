import axios from "axios";
import toast from "react-hot-toast";
import { api_url } from "../App";


//create customer
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${api_url}/api/Customer`, customerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
// Get all customers
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${api_url}/api/Customer`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Get a customer by ID
export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/api/Customer/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Update a customer
export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(`${api_url}/api/Customer/${id}`, customerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    toast.success("Customer Details Updated Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
//delete a customer
export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/Customer/${id}`);
    toast.success("Customer Deleted Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
