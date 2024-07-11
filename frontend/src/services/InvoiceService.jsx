import axios from "axios";
import toast from "react-hot-toast";

export const BACKEND_URL = "http://localhost:3000/api/invoice";

export const createInvoice = async (invoiceData) => {
  try {
    const res = await axios.post(BACKEND_URL, invoiceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    toast.success("Invoice Created Successfully");
    return res.data;
  } catch (error) {
    console.log("Something Went Wrong!", error);
  }
};

export const getInvoives = async () => {
  try {
    const res = await axios.get(BACKEND_URL);
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log("Something Went Wrong!", error);
  }
};

export const getInvoiceById = async (id) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log("Something Went Wrong!", error);
  }
};
export const deleteInvoice = async (id) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/${id}`);
    toast.success("Invoice Deleted Successfully!");
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log("Something Went Wrong!", error);
  }
};
export const updateInvoice = async (id, invoiceData) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/${id}`, invoiceData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Invoice Updated Successfully!");
    console.log(res.data);
    return res.data;
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.log("Something Went Wrong!", error);
  }
};
