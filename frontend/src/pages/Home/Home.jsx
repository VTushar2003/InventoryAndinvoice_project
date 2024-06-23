import React from 'react'
import logo from './logo.svg'
import BannerImg from  "./bannerImg.png"
import {Link} from  'react-router-dom'
import "./Home.css"
const Home = () => {
  return (
    <>
    <div className='home  w-screen h-screen bg-[#030B6B]'>
        <nav className='container-nav flex bg-white  items-center justify-around h-[12vh]' >
            <div className='flex items-center '>
                <img src={logo} alt="Logo" /> 
                <h1 className='text-[#1a6ff8] font-[grifter]'>INVENTRA</h1>
            </div>
        <div className='homeLinks w-[15rem]'>
            <ul className='links flex  items-center justify-around gap-[10px]'>
                <li>
                    <button className='btn font-semibold '>Register Admin</button>
                </li>
                <li>
                    <button className='btn font-semibold'>Login</button>
                </li>
            </ul>
        </div>
        </nav>
        <div className='banner w-screen h-[85vh]  flex items-center justify-evenly'>
            <div className='shape h-[45vh] w-[50%] pl-[3rem] pr-[3rem] '>
                <h1 className='text-[2rem] font-[grifter]'>Inventory and Invoice Management System Solutions</h1>
                <p className='text-[1.2rem] mt-[2rem]'>Our inventory management software allows users to efficiently track stock levels of your products in real time And Create,Manage Invoices for your Business.</p>
            </div>
            <div className='w-[50%]'>
                <img src={BannerImg} alt="Image" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
