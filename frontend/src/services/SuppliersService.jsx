import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_URL = "http://localhost:3000/api/Supplier";

//create supplier
export const createSupplier = async (supplierData) => {
  try {
    const response = await axios.post(BACKEND_URL, supplierData, {
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
    const response = await axios.get(BACKEND_URL);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Get a supplier by ID
export const getSuppluerById = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${id}`);
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
    const response = await axios.put(`${BACKEND_URL}/${id}`, customerData, {
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
    const response = await axios.delete(`${BACKEND_URL}/${id}`);
    toast.success("Supplier Deleted Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
