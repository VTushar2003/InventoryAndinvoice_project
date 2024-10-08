import React, { useEffect } from "react";
import DefaultLayout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import ProductSummary from "../../components/productsummary/productSummary";
import { selectIsLoggedIn } from "../../redux/auth/AuthReducer";
import { getProducts } from "../../redux/rootReducer";
import useRedirectLoggedOutUser from './../../customhooks/useRedirectLoggedOutUser';
import Chart from "../../components/Chart/Chart";

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
    <DefaultLayout>
      <div className="border-[1px] border-[#b8babe] rounded-xl overflow-hidden mb-4">
        <div className="flex items-center border-[#b8babe] border-b-[1px] bg-[#F9F9FB] justify-start p-2">
          <h1 className="text-black pl-4 text-[1.5rem] font-[gilroy] font-normal">
            Inventory Stats
          </h1>
        </div>
        <ProductSummary />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="flex-1 min-w-[300px] ">
          <Chart />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
