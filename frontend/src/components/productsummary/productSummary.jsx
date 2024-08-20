import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import axios from "axios";

// Format Amount
const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStoreValue, setTotalStoreValue] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const url = "http://localhost:3000/";

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const res = await axios.get(`${url}api/products/`);
        const products = res.data;

        setTotalProducts(products.length);
        setTotalStoreValue(
          products.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          )
        );
        setTotalCategories(
          new Set(products.map((product) => product.category)).size
        );
        setOutOfStock(
          products.filter((product) => product.quantity === 0).length
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getStatistics();
  }, []);

  return (
    <div className=" flex items-start justify-start w-fit mb-4 ">
      <Row className="h-auto w-max mx-auto overflow-x-auto gap-4 border-2 flex-wrap items-stretch border-gray-300 bg-white ">
        <Col className="flex-1 max-w-6 min-w-[10rem] flex flex-col  items-center p-4 rounded-md justify-evenly transition-transform transform hover:-translate-y-2 ">
          <MdOutlineShoppingCart className="text-[2.5rem] p-[.5rem] text-white bg-[--light-blue] rounded-full border-2" />
          <div>
            <h1 className="text-center  font-[grifter] text-[1.1rem]">
              {totalProducts}
            </h1>
            <Typography.Text className="text-[1rem] font-semibold">
              Total Products
            </Typography.Text>
          </div>
        </Col>

        <Col className="flex-1 max-w-6 min-w-[10rem] flex flex-col  items-center p-4  justify-evenly transition-transform transform hover:-translate-y-2 ">
          <FaIndianRupeeSign className="text-[2.5rem] p-[.5rem] text-white bg-green-500 rounded-full border-2" />
          <div>
            <h1 className="text-center  font-[grifter] text-[1.1rem] ">{`₹ ${formatNumbers(
              totalStoreValue.toFixed(2)
            )}`}</h1>
            <Typography.Text className="text-[1rem] font-semibold ">
              Total Store Value
            </Typography.Text>
          </div>
        </Col>
        <Col className="flex-1 max-w-6 min-w-[10rem] flex flex-col  items-center p-4 rounded-md justify-evenly transition-transform transform hover:-translate-y-2 ">
          <MdOutlineRemoveShoppingCart className="text-[2.5rem] p-[.5rem] text-white bg-red-500 rounded-full border-2" />
          <div>
            <h1 className="text-center font-[grifter] text-[1.1rem]">
              {outOfStock}
            </h1>
            <Typography.Text className="text-[1rem] font-semibold ">
              Out of stock
            </Typography.Text>
          </div>
        </Col>
        <Col className="flex-1 max-w-6 min-w-[10rem] flex flex-col  items-center p-4 rounded-md justify-evenly transition-transform transform hover:-translate-y-2">
          <TbCategory className="text-[2.5rem] p-[.5rem] text-white bg-light-blue-500 rounded-full border-2" />
          <div>
            <h1 className="text-center font-[grifter] text-[1.1rem]">
              {totalCategories}
            </h1>
            <Typography.Text className="text-[1rem] font-semibold">
              Total Categories
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSummary;
