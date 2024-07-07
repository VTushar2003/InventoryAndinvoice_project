import React, { useState, useEffect } from "react";
import { Space, Table } from "antd";
import axios from "axios";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../redux/rootReducer";
import EditProduct from "../../pages/Product/EditProduct";
import ProductDetails from "../productDetails/ProductDetails";
import AddProduct from "../../pages/Product/AddProduct";

const ProductData = () => {
  const dispatch = useDispatch();

  //edit product state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  //view product state
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  //get products state
  const [items, setItems] = useState([]);
  const url = "http://localhost:3000/";
  //replace blank space with null
  const replaceEmptyWithNull = (item) => {
    const newItem = {};
    for (const key in item) {
      newItem[key] = item[key] === "" ? null : item[key];
    }
    return newItem;
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${url}api/products/`);
      const productsWithKeys = response.data
        .map((item, index) => ({
          ...item,
          key: item.productId || index, // Ensure each item has a unique key
        }))
        .map((item) => replaceEmptyWithNull(item));
      setItems(productsWithKeys);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [dispatch]);

  //getproduct with id

  // Get product with ID
  const fetchProductById = async (productId) => {
    try {
      const result = await dispatch(getProduct(productId));
      setViewingProduct(result.payload);
      console.log("product details :",result.payload);
    } catch (error) {
      console.error("Failed in getting product data", error);
    }
  };

  const delProduct = async (productId) => {
    try {
      console.log("Deleting product:", productId);
      await dispatch(deleteProduct(productId));
      console.log("Product deleted successfully:", productId);
      // Update products list after successful deletion
      getAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  //Add Product

  const AddProductData = async () => {
    try {
      getAllProducts();
      console.log("added complete");
    } catch (error) {
      console.error("Error adding products:", error);
    }
  };

  //edit product
  const editProduct = async (productId,formData) => {
    try {
      debugger;
      await dispatch(updateProduct({productId,formData}));
      setEditModalVisible(false);
      getAllProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const columns = [
    {
      title: "Product_Id",
      dataIndex: "productId",
      key: "productId",
      responsive: ["sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["sm"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      responsive: ["sm"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["sm"],
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* view product details */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setViewModalVisible(true),
              fetchProductById(record.productId)   
            }}
          >
            <EyeOutlined />
          </button>
          {/* edit product */}
          <button
            className="hover:text-blue-500"
            onClick={() => {
              setEditingProduct(record);
              setEditModalVisible(true);
            }}
          >
            <EditOutlined />
          </button>
          {/* delete product */}
          <button
            className="hover:text-red-700"
            onClick={() => delProduct(record.productId)}
          >
            <DeleteOutlined />
          </button>
        </Space>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-[1rem]">
        <AddProduct onProductAdded={AddProductData} />
      </div>

      <Table
        columns={columns}
        size="large"
        dataSource={items}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6, // Set the number of items per page
          showSizeChanger: true, // Allow changing the number of items per page
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
     {editingProduct && (
        <EditProduct
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSubmit={editProduct}
          product={editingProduct}
        />
      )}
      {viewingProduct && (
        <ProductDetails 
          visible={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          product={viewingProduct}
        />
      )}
    </>
  );
};

export default ProductData;
