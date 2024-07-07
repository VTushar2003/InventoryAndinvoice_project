import React,{useEffect} from "react";
import DefaultLayout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import ProductSummary from "../../components/productsummary/productSummary";
import { selectIsLoggedIn } from "../../redux/auth/AuthReducer";
import { getProducts } from "../../redux/rootReducer";
import useRedirectLoggedOutUser from './../../customhooks/useRedirectLoggedOutUser';

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
 

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }
  }, [isLoggedIn, dispatch]);


  return (
    <>
      <DefaultLayout>
        <h1 className="text-black text-[2rem] pb-2 font-thin">
          Inventory Stats
        </h1>
        <ProductSummary />
        <hr className="mb-[1rem] border-[.2rem]" />
        <div className="h-full"></div>
      </DefaultLayout>
    </>
  );
};

export default Dashboard;
