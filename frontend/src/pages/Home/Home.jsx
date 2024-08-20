import React from "react";
import logo from "./logo.svg";
import BannerImg from "./bannerImg.png";
import { HideLink } from "./../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home w-screen h-screen bg-[#030B6B] flex flex-col">
      <nav className="bg-white h-[5rem] flex items-center justify-evenly">
        <div className="logo flex items-center w-fit">
          <img src={logo} alt="logo" className="h-8 md:h-10" />
          <h1 className="text-[--light-blue] font-[grifter] text-xl md:text-2xl ml-2">INVENTRA</h1>
        </div>
        <div>
          <HideLink />
        </div>
      </nav>

      <div className="banner flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-[85vh] px-4 md:px-8 mt-4">
        <div className="shape w-full md:w-[50%] text-center md:text-left p-4 md:p-6">
          <h1 className="text-4xl md:text-3xl font-[grifter] text-white">
            Inventory and Invoice Management System Solutions
          </h1>
          <p className="text-base md:text-lg mt-4 text-white">
            Our inventory management software allows users to efficiently
            track stock levels of your products in real time and create,
            manage invoices for your business.
          </p>
        </div>
        <div className="w-[50%] md:w-[40%] mt-4 md:mt-0">
          <img src={BannerImg} alt="Banner" className="w-full h-auto object-cover rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Home;
