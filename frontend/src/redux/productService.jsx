import axios from "axios";
import { api_url } from './../App';


// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(`${api_url}/api/products/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("formdata", formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(`${api_url}/api/products/`);
  return response.data;
};

// Delete a Product
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${api_url}/api/products/deleteProduct/${productId}`);
  return response.data;
};
// Get a Product
const getProduct = async (productId) => {
  const response = await axios.get(`${api_url}/api/products/${productId}`);
  return response.data;
};
// Update Product
const updateProduct = async (productId, formData) => {
  const response = await axios.put(`${api_url}/api/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};

export default productService;
