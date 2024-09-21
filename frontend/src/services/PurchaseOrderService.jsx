import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_URL = "/api/PurchaseOrder";

//create Purchase order
export const createPurchaseorder = async (purchaseData) => {
  try {
    const response = await axios.post(BACKEND_URL, purchaseData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    toast.success("Purchase Order created Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
// Get all Purchase order
export const getPurchaseorder = async () => {
  try {
    const response = await axios.get(BACKEND_URL);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Get a Purchase order by ID
export const getPurchaseorderById = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};

// Update a Purchase order
export const updatePurchaseorder = async (id, purchaseData) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/${id}`, purchaseData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    toast.success("Purchase Order Updated Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
//delete a Purchase order
export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/${id}`);
    toast.success("Purchase Order Deleted Successfully!");
    return response.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log(error);
  }
};
