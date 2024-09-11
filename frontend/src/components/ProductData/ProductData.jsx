import React, { useRef, useState, useEffect, useMemo } from "react";
import { Space, Table, Input, Button, Modal } from "antd";
import axios from "axios";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteProduct, getProduct, updateProduct } from "../../redux/rootReducer";
import EditProduct from "../../pages/Product/EditProduct";
import ProductDetails from "../productDetails/ProductDetails";
import AddProduct from "../../pages/Product/AddProduct";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const { confirm } = Modal;

const fetchProducts = async () => {
  const response = await axios.get("http://localhost:3000/api/products/");
  return response.data.map((item, index) => ({
    ...item,
    key: item.productId || index, // Ensure each item has a unique key
  }));
};

const ProductData = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //edit product state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  //view product state
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Get products data using react-query
  const { data: items = [], refetch } = useQuery('products', fetchProducts);

  // Mutation to delete a product
  const mutationDelete = useMutation(
    (productId) => dispatch(deleteProduct(productId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    }
  );

  // Mutation to update a product
  const mutationUpdate = useMutation(
    ({ productId, formData }) => dispatch(updateProduct({ productId, formData })),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        setEditModalVisible(false);
      },
    }
  );

  // Mutation to add a product
  const mutationAdd = useMutation(
    () => fetchProducts(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    }
  );

  const fetchProductById = async (productId) => {
    try {
      const result = await dispatch(getProduct(productId));
      setViewingProduct(result.payload);
      console.log("product details :", result.payload);
    } catch (error) {
      console.error("Failed in getting product data", error);
    }
  };

  const delProduct = (productId) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: () => {
        mutationDelete.mutate(productId);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const AddProductData = () => {
    mutationAdd.mutate();
    console.log("Product added and list updated");
  };

  const editProduct = async (productId, formData) => {
    try {
      mutationUpdate.mutate({ productId, formData });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  //handle search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: "white" }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : console.log("error"),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = useMemo(() => [
    {
      title: "Product_Id",
      dataIndex: "productId",
      key: "productId",
      ...getColumnSearchProps('productId'),
      responsive: ["sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
      ...getColumnSearchProps('name'),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["sm"],
      ...getColumnSearchProps('category'),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm"],
      render: (text, record) => (
        <div
          style={{
            background: record.quantity < 10 ? "red" : "green",
            borderRadius: "3px",
            color: "white",
            padding: "0 5px",
            textAlign: "center",
          }}
        >
          {record.quantity}
        </div>
      ),
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
      ...getColumnSearchProps('supplier'),
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
              setViewModalVisible(true);
              fetchProductById(record.productId);
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
  ], [searchText, searchedColumn, items]);

  return (
    <>
      <div className="flex justify-end mb-[1rem]">
        <AddProduct onProductAdded={AddProductData} />
      </div>

      <Table
        rowClassName="text-[1rem] text-center"
        bordered={true}
        columns={columns}
        size="large"
        dataSource={items}
        scroll={{ x: "100%" }}
        pagination={{
          pageSize: 6,
          showSizeChanger: true,
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
