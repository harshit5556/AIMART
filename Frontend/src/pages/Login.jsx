import React, { useContext } from 'react'
import Logo from '../assets/vcart logo.png';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { FiEye } from "react-icons/fi";
import  { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../../utils/Firebase';
import {auth} from '../../utils/Firebase';
import { userDatacontext } from '../context/userContext.jsx';
import Loading from '../component/Loading.jsx';
import { ToastContainer , toast } from 'react-toastify';
const Login = () => {
 
  let [show,Setshow] = useState(false);
  let [email,setEmail] = useState("")
 let [password,setPassword] = useState("")
 let {getCurrentuser} = useContext(userDatacontext)
 const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const result = await axios.post("http://localhost:8000/api/auth/login",{
        email,password},{withCredentials:true})
        console.log(result.data)
         toast.success("Login Successfully")
        getCurrentuser()
        setLoading(false)
        navigate("/")
    }
    catch(error){
      console.log("login error", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login Error");
      }
      setLoading(false)
    }
  } 
// Google login page
  const googleLogin = async ()=>{
    try{
  const response = await signInWithPopup(auth , provider)
  let user = response.user
  let name = user.displayName; 
  let email= user.email
  const result =await axios.post("http://localhost:8000/api/auth/googlelogin",{
    name, email} ,{withCredentials:true})
    getCurrentuser()
        navigate("/")
        toast.success("Login Successfully")
        console.log(result.data)
        setLoading(false)
    }
    catch(error){
      console.log(error)
      toast.error("Login Error");
     setLoading(false);
    }
  }
  
  return (
<div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
    {/* Logo Section */}
    <div
      className="w-full h-[80px] flex items-center px-8 gap-3 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <img className="w-[50px]" src={Logo} alt="Logo" />
      <h1 className="text-[22px] font-sans">AIMART</h1>
    </div>

    {/* Header Text */}
    <div className="w-full text-center mt-4 mb-2">
      <span className="text-[28px] font-semibold block">Login Page</span>
      <span className="text-[18px] block">Welcome to AIMART, Place your order</span>
    </div>

    {/* Form Card */}
    <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg py-6 px-4">
      <form className="flex flex-col items-center gap-5" onSubmit={handleLogin}>
        {/* Google Button */}
        <div className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-2 cursor-pointer font-semibold" onClick={googleLogin}>
          <img src={google} alt="Google" className="w-[20px]" />
          Login account  with Google
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="flex-grow h-px bg-[#96969635]" />
          OR
          <div className="flex-grow h-px bg-[#96969635]" />
        </div>

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
            {loading ? (<Loading/>) : ("Login")}
          </button>

          {/* Redirect to Login */}
          <p className="text-center text-sm">
            You haven't any account?{' '}
            <span
              className="text-[#5555f6] font-semibold cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Create New Account 
            </span>
          </p>
        </div>
      </form>
    </div>
    <ToastContainer />
  </div>
  );
};

export default Login