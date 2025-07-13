import React, { useContext, useState } from 'react';
import Logo from '../assets/vcart logo.png';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { FiEye } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../../utils/Firebase';
import {auth} from '../../utils/Firebase';
import { userDatacontext} from '../context/userContext';
import {  toast } from 'react-toastify';
import Loading from '../component/Loading';


const Registration = () => {
  let [show,Setshow] = useState(false);
 let [name,setName] = useState("")
 let [email,setEmail] = useState("")
 let [password,setPassword] = useState("")
 let {getCurrentuser} = useContext(userDatacontext)
  const navigate = useNavigate();
 const [loading , setLoading] = useState(false);

 const handleSignup = async (e) =>{
  setLoading(true)
e.preventDefault()
  try{
 const result = await axios.post("http://localhost:8000/api/auth/registration",{
  name,email,password},{withCredentials:true})
  getCurrentuser()
  navigate("/")
  console.log(result.data)
  toast.success("Registration Successfully")
  setLoading(false)
}
catch(error){
console.log(error)
if (error.response && error.response.data && error.response.data.message) {
  toast.error(error.response.data.message); 
} else {
  toast.error("Registration Failed");
}
}finally {
  setLoading(false);
}
};
const googlesignup = async ()=>{
  try{
const response = await signInWithPopup(auth , provider)
let user = response.user
let name = user.displayName; 
let email= user.email
const result =await axios.post("http://localhost:8000/api/auth/googlelogin",{
  name, email} ,{withCredentials:true})
  getCurrentuser()
  navigate("/")
  console.log(result.data)
  toast.success("Registration Successfully")

  }
  catch(error){
    console.log(error)
    toast.error("Registration Failed")
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
        <span className="text-[28px] font-semibold block">Registration Page</span>
        <span className="text-[18px] block">Welcome to AIMART, Place your order</span>
      </div>

      {/* Form Card */}
      <div className="max-w-[600px] w-[90%] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg py-6 px-4">
        <form className="flex flex-col items-center gap-5" onSubmit={handleSignup}>
          {/* Google Button */}
          <div className="w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-2 cursor-pointer font-semibold" onClick={googlesignup}>
            <img src={google} alt="Google" className="w-[20px]" />
            Registration with Google
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
              type="text"
              placeholder="UserName"
              required
              className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-4 font-semibold"
              onChange={(e)=>setName(e.target.value)} value={name}
            />
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
              {!show &&<FiEye className="absolute top-1/2 right-3 transform -translate-y-1/2 w-[20px] h-[20px] cursor-pointer text-white" onClick={()=>Setshow(prev=> !prev)} />}
             {show && <IoEyeSharp className="absolute top-1/2 right-3 transform -translate-y-1/2 w-[20px] h-[20px] cursor-pointer text-white" onClick={()=>Setshow(prev=> !prev)} />}

            </div>
                
            {/* Submit Button */}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center text-[17px] font-semibold mt-2">
              {loading ? (<Loading/>) : ("Create Account")}
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm">
              Already have an account?{' '}
              <span
                className="text-[#5555f6] font-semibold cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
