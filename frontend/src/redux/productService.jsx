import axios from "axios";

const API_URL = `http://localhost:3000/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("formdata", formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}deleteProduct/${productId}`);
  return response.data;
};
// Get a Product
const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}${productId}`);
  return response.data;
};
// Update Product
const updateProduct = async (productId, formData) => {
  const response = await axios.put(`${API_URL}${productId}`, formData, {
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
