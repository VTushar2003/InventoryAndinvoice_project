import axios from "axios";
import toast from "react-hot-toast";
import { api_url } from './../App';


//create supplier
export const createSupplier = async (supplierData) => {
  try {
    const response = await axios.post(`${api_url}/api/Supplier`, supplierData, {
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
// Get all supplier
export const getSuppliers = async () => {
  try {
    const response = await axios.get(`${api_url}/api/Supplier`);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Get a supplier by ID
export const getSuppluerById = async (id) => {
  try {
    const response = await axios.get(`${api_url}/api/Supplier/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Update a supplier
export const updateSupplier = async (id, customerData) => {
  try {
    const response = await axios.put(`${api_url}/api/Supplier/${id}`, customerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    toast.success("Supplier Details Updated Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
//delete a supplier
export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${api_url}/api/Supplier/${id}`);
    toast.success("Supplier Deleted Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
