import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_URL = "http://localhost:3000/api/Customer";

//create customer
export const createCustomer = async (customerData) => {
  try {
    const response = await axios.post(BACKEND_URL, customerData, {
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
    const response = await axios.get(BACKEND_URL);
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
    const response = await axios.get(`${BACKEND_URL}/${id}`);
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
    const response = await axios.put(`${BACKEND_URL}/${id}`, customerData, {
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
    const response = await axios.delete(`${BACKEND_URL}/${id}`);
    toast.success("Customer Deleted Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
