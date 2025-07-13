import React, { useContext, useState } from 'react'
import AIMART from '../assets/vcart logo.png'
import { userDatacontext} from '../context/userContext';
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
       const result = await axios.get("http://localhost:8000/api/auth/logout",{withCredentials: true})
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
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between
    px-[30px] shadow-md shadow-black'>
        <div className='w-[30%] flex items-center justify-start gap-[10px]' onClick={()=>navigate("/")}>
        <img src = {AIMART}  alt ="" className='w-[50px]'/>
        <h1 className='text-[25px] text-[black] font-sans'>AIMART</h1>
        </div>
        <div className='w-[40%] hidden md:flex'> 
            <ul className='flex items-center justify-center gap-[19px] text-[white]'>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/")}>HOME</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/collection")}>COLLECTIONS</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/about")}>ABOUT</li>
                <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/contact")}>CONTACT</li>

            </ul>
        </div> 
        <div className=' w-[30%] flex items-center justify-end gap-[25px]'>
        {!showsearch && <IoSearchCircleOutline   className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={()=>{setshowsearch(prev=>!prev); navigate("/collection")}}/>}
        {showsearch && <IoSearchCircleSharp   className='w-[30px] h-[30px] text-[#000000] cursor-pointer' onClick={()=>setshowsearch(prev=>!prev)}/>}
        {!userData && <FaCircleUser className='w-[25px] h-[25px] text-[#000000] cursor-pointer' onClick={()=>{setShowProfile(prev=>!prev)}} />}
        {userData && <div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center 
        justify-center cursor-pointer' onClick={()=>setShowProfile(prev=>!prev)}>{userData?.name.slice(0,1)}</div>}
        <TiShoppingCart className='w-[25px] h-[25px] text-[#000000] cursor-pointer hidden md:block' onClick={()=>navigate("/cart")}/>
        {getcount() > 0 && (
  <p className='absolute w-5 h-5 flex items-center justify-center bg-black text-white font-semibold rounded-full text-[10px] top-[10px] right-[22px]'>
    {getcount()}
  </p>
)}

        </div>
      {showsearch &&<div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex py-[20px]
        item-center justify-center'>
         <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] py-[20px]
         placeholder:text-white text-[white] text-[18px]' placeholder='Search Here' onChange={(e)=>{setsearch(e.target.value)}} value = {search} />
        </div>}
        {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px]
        border-[#aaa9a9] rounded-[10px] z-10'>
        <ul className='w-[100%] h-[100%] flex items-center justify-around flex-col text-[17px] py-[10px]
        text-[white]'>
           {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{navigate("/login");setShowProfile(false)}}>Login</li>}
            {userData&&<li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{handlelogout();setShowProfile(false)}}>Logout</li>}
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'onClick={()=>{navigate("/order");setShowProfile(false)}}>Orders</li>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={()=>{navigate("/about"); setShowProfile(false)}}>About</li>
        </ul>
        </div>}
        
         <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] flex bottom-0 left-0
         bg-[#191818] md:hidden'>
         <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/")}><FaHome className='w-[30px]
          h-[30px] text-[white] md:hidden'/>HOME </button>
          <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/collections")}><FaHome className='w-[30px]
          h-[30px] text-[white] md:hidden'/><MdCollections  className='w-[30px] h-[30px] text-[white] md:hidden' />COLLECTIONS</button>
          <button className='text-[white] flex items-center justify-center flex-col gap-[2px]'onClick={()=>navigate("/contact")}><FaHome className='w-[30px]
          h-[30px] text-[white] md:hidden'/><FaCircleUser className='w-[30px] h-[30px] text-[white] md:hidden'/>CONTACT</button>
          <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' ><FaHome className='w-[30px]
          h-[30px] text-[white] md:hidden' onClick={()=>navigate("/cart")}/><TiShoppingCart className='w-[30px] h-[30px] text-[white] md:hidden'/> CART</button>
        
        {getcount() > 0 && (
  <p className='absolute w-5 h-5 flex items-center justify-center bg-white text-black font-semibold rounded-full text-[10px] top-[8px] right-[18px]'>
    {getcount()}
  </p>
)}

         </div>
    </div>
  )
}

export default Nav