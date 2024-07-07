import React, { useState } from "react";
import ProductForm from "./../../components/productForm/productForm";
import { useDispatch } from "react-redux";
import { createProduct, getProducts } from "../../redux/rootReducer";
import axios from "axios";

const initialState = {
  productId: "",
  name: "",
  category: "",
  price: "",
  supplier: "",
  quantity: "",
};
const AddProduct = ({ onProductAdded }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState();
  const [description, setDescription] = useState("");
  const { name, category, price, quantity, supplier, productId } = product;

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    console.log(e);
    if (e.target.files) {
      const file = e.target.files[0];
      setProductImage(file);
    } 
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", productImage ? productImage : null);
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", Number(quantity));
    formData.append("supplier", supplier);
    formData.append("description", description);
    console.log(...formData);
    try {
      /*  */
      await dispatch(createProduct(formData));
      setProduct(initialState);
      setProductImage(null);
      setDescription("");
      onProductAdded(); // Notify parent component or perform any necessary action
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <ProductForm
        product={product}
        productImage={productImage}
        description={description}
        setDescription={setDescription}
        handleImageChange={handleImageChange}
        handleInputchange={handleInputchange}
        saveProduct={saveProduct}
      />
    </>
  );
};

export default AddProduct;
