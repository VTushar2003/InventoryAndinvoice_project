import React ,{useEffect, useState}from 'react'
import { Col, Row, Space, Typography } from 'antd';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { MdOutlineRemoveShoppingCart ,MdOutlineShoppingCart} from "react-icons/md";

import axios from 'axios';


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
        setTotalStoreValue(products.reduce((total, product) => total + (product.price * product.quantity), 0));
        setTotalCategories(new Set(products.map(product => product.category)).size);
        setOutOfStock(products.filter(product => product.quantity == 0).length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getStatistics();
  }, []);
    /* 
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const category = useSelector(selectCategory);
    
    useEffect(()=>{
      if(products && products.length > 0){
      dispatch(CALC_STORE_VALUE(products));
      dispatch(CALC_OUTOFSTOCK(products));
      dispatch(CALC_CATEGORY(products));
      }
    },[dispatch,products]) */
  return (
   <>
   <Row className='h-32 mx-auto overflow-x-auto'>
      <Space size={20}>
        <Col className='bg-[--light-blue] w-[13rem] h-[15vh] flex items-center pl-[.5rem] rounded-md justify-evenly hover:-translate-y-2 transition-all'>
          <MdOutlineShoppingCart className='text-[2.5rem] p-[.5rem] text-white rounded-full border-2' />
          <div>
            <Typography.Text className='text-[1rem] font-semibold text-white'> Total Products</Typography.Text>
            <h1 className='text-center font-[grifter] text-[1.5rem]'>{totalProducts}</h1>
          </div>
        </Col>
        <Col className='hover:-translate-y-2 transition-all bg-green-600 w-[13rem] h-[15vh] flex items-center pl-[.5rem] rounded-md justify-evenly'>
          <FaIndianRupeeSign className='text-[2.5rem] p-[.5rem] text-white rounded-full border-2' />
          <div>
            <Typography.Text className='text-[1rem] font-semibold text-white'> Total Store Value</Typography.Text>
            <h1 className='text-center font-[grifter] text-[1.2rem]'>{`Rs ${formatNumbers(totalStoreValue.toFixed(2))}`}</h1>
          </div>
        </Col>
        <Col className='hover:-translate-y-2 transition-all bg-red-600 w-[13rem] h-[15vh] flex items-center pl-[.5rem] rounded-md justify-evenly'>
          <MdOutlineRemoveShoppingCart className='text-[2.5rem] p-[.5rem] text-white rounded-full border-2' />
          <div>
            <Typography.Text className='text-[1rem] font-semibold text-white'> Out of stock</Typography.Text>
            <h1 className='text-center font-[grifter] text-[1.5rem]'>{outOfStock}</h1>
          </div>
        </Col>
        <Col className='hover:-translate-y-2 transition-all bg-[--light-blue] w-[13rem] h-[15vh] flex items-center pl-[.5rem] rounded-md justify-evenly'>
          <TbCategory className='text-[2.5rem] p-[.5rem] text-white rounded-full border-2' />
          <div>
            <Typography.Text className='text-[1rem] font-semibold text-white'>Total Categories</Typography.Text>
            <h1 className='text-center font-[grifter] text-[1.5rem]'>{totalCategories}</h1>
          </div>
        </Col>
      </Space>
    </Row>
   </>
  )
}

export default ProductSummary;