import React, { useContext, useState } from 'react';
import AIMART from '../assets/vcart logo.png';
import { userDatacontext } from '../context/UserContext';
import { ShopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaSearch, FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdCollections } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";

const Nav = () => {
  const { userData, getCurrentuser } = useContext(userDatacontext);
  const { showsearch, setshowsearch, search, setsearch, getcount } = useContext(ShopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const itemCount = getcount();
  const handlelogout = async () => {
    try {
      const result = await axios.get("https://aimart.onrender.com/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      await getCurrentuser();
      toast.success("Logged out successfully 👋", { autoClose: 2000 });
      navigate("/login");
      setShowProfile(false);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again!", { autoClose: 2000 });
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <div className='w-full h-[70px] bg-[#ecfafa] fixed top-0 z-40 flex items-center justify-between px-4 md:px-8 shadow-md'>
        {/* Logo */}
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
          <img src={AIMART} alt="AIMART Logo" className='w-[45px]' />
          <h1 className='text-[22px] text-black font-bold'>AIMART</h1>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex gap-6 text-white font-medium'>
          <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer transition duration-200 hover:bg-gray-700' onClick={() => navigate("/")}>HOME</li>
          <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer transition duration-200 hover:bg-gray-700' onClick={() => navigate("/collection")}>COLLECTIONS</li>
          <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer transition duration-200 hover:bg-gray-700' onClick={() => navigate("/about")}>ABOUT</li>
          <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer transition duration-200 hover:bg-gray-700' onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>

        {/* Right Icons */}
        <div className='flex items-center gap-5 relative'>
          {!showsearch ? (
            <IoSearchCircleOutline className='w-7 h-7 text-black cursor-pointer' onClick={() => { setshowsearch(prev => !prev); navigate("/collection"); }} />
          ) : (
            <IoSearchCircleSharp className='w-7 h-7 text-black cursor-pointer' onClick={() => setshowsearch(prev => !prev)} />
          )}

          {/* User Icon */}
          {!userData ? (
            <FaCircleUser className='w-6 h-6 text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
          ) : (
            <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer font-bold' onClick={() => setShowProfile(prev => !prev)}>
              {userData?.name?.slice(0, 1)}
            </div>
          )}

          {/* Cart Icon */}
          <TiShoppingCart className='w-6 h-6 text-black cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />

          {/* Desktop Cart Badge */}
          {itemCount > 0 && (
            <p className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full font-semibold'>
              {itemCount}
            </p>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {showsearch && (
        <div className='w-full h-[70px] bg-[#d8f6f9dd] absolute top-[70px] left-0 flex items-center justify-center z-30'>
          <input
            type="text"
            className='w-[90%] md:w-1/2 h-10 bg-[#1e3a3a] rounded-full px-6 py-2 placeholder:text-gray-300 text-white text-[16px] outline-none border border-[#ffffff30] focus:ring-2 focus:ring-cyan-300'
            placeholder='Search Here'
            onChange={(e) => setsearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute top-[80px] right-4 w-[220px] bg-black text-white rounded-xl shadow-lg border border-gray-600 z-50'>
          <ul className='flex flex-col items-start justify-around text-white text-[16px] h-full py-2'>
            {!userData && (
              <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false); }}>Login</li>
            )}
            {userData && (
              <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { handlelogout(); setShowProfile(false); }}>Logout</li>
            )}
            <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
            <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className='fixed bottom-0 left-0 w-full h-[65px] bg-black flex items-center justify-around md:hidden z-50 border-t border-gray-700'>
        <button className='flex flex-col items-center text-white text-xs font-medium' onClick={() => navigate("/")}>
          <FaHome className='w-6 h-6 mb-1' />Home
        </button>
        <button className='flex flex-col items-center text-white text-xs font-medium' onClick={() => navigate("/collection")}>
          <MdCollections className='w-6 h-6 mb-1' />Collections
        </button>
        <button className='flex flex-col items-center text-white text-xs font-medium' onClick={() => navigate("/contact")}>
          <FaCircleUser className='w-6 h-6 mb-1' />Contact
        </button>
        <button className='flex flex-col items-center text-white text-xs font-medium' onClick={() => navigate("/cart")}>
          <TiShoppingCart className='w-6 h-6 mb-1' />Cart
        </button>
      </div>

      {/* Cart Badge (Mobile) */}
      {itemCount > 0 && (
  <p className='md:hidden fixed bottom-[60px] right-4 w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full font-semibold z-50'>
    {itemCount}
  </p>
)}
    </>
  );
};

export default Nav;
