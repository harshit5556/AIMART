import React, { useContext, useState } from 'react'
import AIMART from '../assets/vcart logo.png'
import { userDatacontext} from '../context/UserContext';
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TiShoppingCart  } from "react-icons/ti";
import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome } from "react-icons/fa";
import { MdCollections } from "react-icons/md"
import { ShopDataContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Nav = () => {
    
 let {userData,getCurrentuser} = useContext(userDatacontext)
 let { showsearch, setshowsearch, search, setsearch, getcount } = useContext(ShopDataContext)
 let [showProfile,setShowProfile] = useState(false)
 let navigate = useNavigate()
   
 const handlelogout = async ()=>{
    try{
        // call api through a axios 
       const result = await axios.get("https://aimart.onrender.com/api/auth/logout",{withCredentials: true})
         console.log(result.data);
         getCurrentuser()
         toast.success("Logged out successfully 👋", { autoClose: 2000 });
         navigate("/login")
    }
    catch(error){
    console.log(error);
    toast.error("Logout failed. Please try again!", { autoClose: 2000 });
    }
 }
   return (
  <>
    {/* Top Navigation Bar */}
    <div className='w-full h-[70px] bg-[#ecfafaec] fixed top-0 z-40 flex items-center justify-between px-4 shadow-md'>
      {/* Left Logo */}
      <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
        <img src={AIMART} alt="AIMART Logo" className='w-[45px]' />
        <h1 className='text-[22px] text-black font-bold'>AIMART</h1>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex gap-6 text-white'>
        <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer hover:bg-slate-600' onClick={() => navigate("/")}>HOME</li>
        <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer hover:bg-slate-600' onClick={() => navigate("/collection")}>COLLECTIONS</li>
        <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer hover:bg-slate-600' onClick={() => navigate("/about")}>ABOUT</li>
        <li className='bg-black/80 px-4 py-2 rounded-2xl cursor-pointer hover:bg-slate-600' onClick={() => navigate("/contact")}>CONTACT</li>
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-5 relative'>
        {!showsearch ? (
          <IoSearchCircleOutline className='w-7 h-7 text-black cursor-pointer' onClick={() => { setshowsearch(prev => !prev); navigate("/collection") }} />
        ) : (
          <IoSearchCircleSharp className='w-7 h-7 text-black cursor-pointer' onClick={() => setshowsearch(prev => !prev)} />
        )}

        {/* User Icon */}
        {!userData ? (
          <FaCircleUser className='w-6 h-6 text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
        ) : (
          <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart Icon */}
        <TiShoppingCart className='w-6 h-6 text-black cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />

        {/* Cart Badge (Desktop) */}
        {getcount() > 0 && (
          <p className='absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] rounded-full'>
            {getcount()}
          </p>
        )}
      </div>
    </div>

    {/* Search Bar */}
    {showsearch && (
      <div className='w-full h-[70px] bg-[#d8f6f9dd] absolute top-[70px] left-0 flex items-center justify-center z-30'>
        <input
          type="text"
          className='w-[85%] md:w-1/2 h-10 bg-[#233533] rounded-full px-6 py-2 placeholder:text-white text-white text-[16px] outline-none'
          placeholder='Search Here'
          onChange={(e) => setsearch(e.target.value)}
          value={search}
        />
      </div>
    )}

    {/* Profile Dropdown */}
    {showProfile && (
      <div className='absolute top-[80px] right-4 w-[220px] h-[150px] bg-black/90 border border-gray-400 rounded-lg z-50'>
        <ul className='flex flex-col items-start justify-around text-white text-[16px] h-full py-2'>
          {!userData && <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false); }}>Login</li>}
          {userData && <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { handlelogout(); setShowProfile(false); }}>Logout</li>}
          <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
          <li className='w-full hover:bg-gray-700 px-4 py-2 cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false); }}>About</li>
        </ul>
      </div>
    )}

    {/* Mobile Bottom Nav */}
    <div className='fixed bottom-0 left-0 w-full h-[65px] bg-[#191818] flex items-center justify-around md:hidden z-50'>
      <button className='flex flex-col items-center text-white text-xs' onClick={() => navigate("/")}>
        <FaHome className='w-6 h-6 mb-1' />Home
      </button>
      <button className='flex flex-col items-center text-white text-xs' onClick={() => navigate("/collection")}>
        <MdCollections className='w-6 h-6 mb-1' />Collections
      </button>
      <button className='flex flex-col items-center text-white text-xs' onClick={() => navigate("/contact")}>
        <FaCircleUser className='w-6 h-6 mb-1' />Contact
      </button>
      <button className='flex flex-col items-center text-white text-xs' onClick={() => navigate("/cart")}>
        <TiShoppingCart className='w-6 h-6 mb-1' />Cart
      </button>
    </div>

    {/* Cart Badge (Mobile) */}
    {getcount() > 0 && (
      <p className='fixed bottom-[55px] right-5 w-5 h-5 flex items-center justify-center bg-white text-black text-[10px] rounded-full font-semibold z-50'>
        {getcount()}
      </p>
    )}
  </>
)
}

export default Nav
