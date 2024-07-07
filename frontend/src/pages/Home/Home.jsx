import React from "react";
import logo from "./logo.svg";
import BannerImg from "./bannerImg.png";
import { HideLink } from "./../../components/protect/HiddenLink";

const Home = () => {
  return (
    <>
      <div className="home w-screen h-screen bg-[#030B6B]">
        <nav className="bg-white h-[5rem] flex items-center justify-evenly">
          <div className="logo flex items-center w-fit">
            <img src={logo} alt="logo" />
            <h1 className="text-[--light-blue] font-[grifter]">INVENTRA</h1>
          </div>
          <div>
            {/*  <ShowOnLogin>
              <Link to="/Dashboard">
                <button className="btn font-semibold">Dashboard</button>
              </Link>
            </ShowOnLogin>
            <ShowOnLogout>
              <Link to="/register">
                <button className="btn mr-2 font-semibold">Register</button>
              </Link>
            </ShowOnLogout>
            <ShowOnLogout>
              <Link to="/login">
                <button className="btn font-semibold">Login</button>
              </Link>
            </ShowOnLogout> */}
            <HideLink />
          </div>
        </nav>

        <div className="banner w-screen h-[85vh] flex items-center justify-evenly">
          <div className="shape h-[45vh] w-[50%] pl-[3rem] pr-[3rem] ">
            <h1 className="text-[2rem] font-[grifter]">
              Inventory and Invoice Management System Solutions
            </h1>
            <p className="text-[1.2rem] mt-[2rem]">
              Our inventory management software allows users to efficiently
              track stock levels of your products in real time And Create,
              Manage Invoices for your Business.
            </p>
          </div>
          <div className="w-[50%]">
            <img src={BannerImg} alt="Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
