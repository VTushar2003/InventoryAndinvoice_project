import axios from "axios";
import toast from "react-hot-toast";
import { api_url } from './../App';


export const createInvoice = async (invoiceData) => {
  debugger;
  try {
    const res = await axios.post(`${api_url}/api/invoice`, invoiceData, {
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
    const res = await axios.get(`${api_url}/api/invoice`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Something Went Wrong!", error);
  }
};

export const getInvoiceById = async (id) => {
  try {
    const res = await axios.get(`${api_url}/api/invoice/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Something Went Wrong!", error);
  }
};
export const deleteInvoice = async (id) => {
  try {
    const res = await axios.delete(`${api_url}/api/invoice/${id}`);
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
    const res = await axios.put(`${api_url}/api/invoice/${id}`, invoiceData, {
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
