import React, { useContext } from 'react'
import Logo from '../assets/vcart logo.png';
import { FiEye } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loding'
const Login = () => {
    let [show,Setshow] = useState(false);
  let [email,setEmail] = useState("")
 let [password,setPassword] = useState("")
 let {AdminData , getAdmin} = useContext(adminDataContext)
 const [loading , setLoading] = useState(false);
let navigate = useNavigate()


 const AdminLogin = async (e)=>{
  setLoading(true);
    e.preventDefault()
    try{
      const result = await axios.post("https://aimart.onrender.com/api/auth/adminlogin",{email,password},
        {withCredentials:true})
        console.log(result.data)
        setLoading(false);
        toast.success("AdminLogin Successfully");
        getAdmin()
        navigate("/")
        }
    catch(error){
   console.log(error)
   toast.error("AdminLogin Failed");
   setLoading(false)
    }
 }
  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
    {/* Logo Section */}
    <div
      className="w-full h-[80px] flex items-center px-8 gap-3 cursor-pointer">
      <img className="w-[50px]" src={Logo} alt="Logo" />
      <h1 className="text-[22px] font-sans">AIMART</h1>
    </div>

    {/* Header Text */}
    <div className="w-full text-center mt-4 mb-2">
      <span className="text-[28px] font-semibold block">Login Page</span>
      <span className="text-[18px] block">Welcome to AIMART, Apply to Admin Login </span>
    </div>

    {/* Form Card */}
    <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg py-6 px-4">
      <form className="flex flex-col items-center gap-5" onSubmit={AdminLogin}>
    


        {/* Inputs */}
        <div className="w-full flex flex-col gap-4 relative">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-4 font-semibold"
            onChange={(e)=>setEmail(e.target.value)} value={email}
          />
          <div className="relative w-full">
            <input
              type={show?"text":"password"}
              placeholder="Password"
              required
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-4 font-semibold pr-10"
              onChange={(e)=>setPassword(e.target.value)} value={password}

            />
            {!show &&<FiEye className="absolute top-1/2 right-3 bottom-5 transform -translate-y-1/2 w-[20px] h-[20px] cursor-pointer text-white " onClick={()=>Setshow(prev=> !prev)} />}
           {show && <IoEyeSharp className="absolute top-1/2 right-3 transform -translate-y-1/2 w-[20px] h-[20px] cursor-pointer text-white" onClick={()=>Setshow(prev=> !prev)} />}

          </div>
              
          {/* Submit Button */}
          <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center text-[17px] font-semibold mt-2">
            {loading ? (<Loading className = 'w-6 h-6 animate-spin'/>) : ("Login")}
          </button>

        </div>
      </form>
    </div>
  </div>
  )
}

export default Login
