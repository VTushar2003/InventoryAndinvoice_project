import React, { useEffect, useState } from "react";
import ProductForm from "./../../components/productForm/productForm";
import { useDispatch } from "react-redux";
import { createProduct, getProducts } from "../../redux/rootReducer";
import toast from "react-hot-toast";

const generateRandomId = () => {
  return `PI-${Math.floor(Math.random() * 100000)}`;
};

const initialState = {
  productId: generateRandomId(),
  name: "",
  category: "",
  price: "",
  supplier: "",
  quantity: "",
};

const AddProduct = ({ onProductAdded }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState([]);
  const [description, setDescription] = useState("");
  const [existingProducts, setExistingProducts] = useState([]);
  const { name, category, price, quantity, supplier, productId } = product;

  useEffect(() => {
    const getexsistingProducts = async () => {
      try {
        const res = await dispatch(getProducts());
        setExistingProducts(res.payload);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getexsistingProducts();
  }, [dispatch]);


  const validateImageExtension = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    return allowedExtensions.includes(fileExtension);
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!validateImageExtension(file)) {
      toast.error('Choose Correct File Format');
      e.target.value = ''; // Reset the file input
      return;
    }
    setProductImage(file);
  };
  const isProductIdUnique = (productId) => {
    return !existingProducts.some((product) => product.productId === productId);
  };

  const saveProduct = async () => {
    if (!isProductIdUnique(product.productId)) {
      toast.error("Product ID must be unique");
      return;
    }
    debugger;
    const formData = new FormData();
    formData.append("image", productImage ? productImage : null);
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("quantity", Number(quantity));
    formData.append("supplier", supplier);
    formData.append("description", description);
    try {
      dispatch(createProduct(formData));
      setProduct({ ...initialState, productId: generateRandomId() });
      setProductImage(null);
      setDescription("");
      onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const resetProductId = () => {
    setProduct({ ...product, productId: generateRandomId() });
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
        isProductIdUnique={isProductIdUnique}
        resetProductId={resetProductId}
      />
    </>
  );
};

export default AddProduct;
