import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Lists = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const result = await axios.get("https://aimart.onrender.com/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }


const removeList = async(id)=>{
  try{
const result = await axios.post(`https://aimart.onrender.com/api/product/remove/${id}`,{},{withCredentials:true})
if(result.data){
  toast.success("Product removed successfully!");
  fetchList()
}
else{
  console.log("Failed To remove Product")
  toast.error("Failed to remove product!");
}
  }
  catch(error){
    toast.error("Failed to remove product!");
 console.log(error)
  }
}


  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 mt-[70px] px-4 md:px-10 py-8 ml-[100px] md:ml-[230px] lg:ml-[320px]'>
          <h2 className='text-2xl md:text-4xl font-semibold mb-6 text-white border-b border-gray-500 pb-2'>
            All Listed Products
          </h2>

          {list.length > 0 ? (
            <div className='flex flex-col gap-6'>
              {list.map((item, index) => (
                <div
                  key={index}
                  className='w-full bg-[#1f2937] rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 hover:shadow-md transition-all duration-300'
                >
                  <img
                    src={item.image1}
                    alt="Product"
                    className='w-full md:w-[120px] h-[100px] object-cover rounded-lg'
                  />
                  <div className='flex-1 text-left space-y-1'>
                    <div className='text-lg md:text-xl font-semibold text-[#bef0f3]'>
                      {item.name}
                    </div>
                    <div className='text-sm md:text-base text-[#bef3da]'>
                      {item.category}
                    </div>
                    <div className='text-sm md:text-base text-[#bef3da]'>
                      ₹ {item.price}
                    </div>
                  </div>
                  <div className='self-end md:self-center'>
                    <button className='w-[35px] h-[35px] flex items-center justify-center text-lg rounded-md
                      hover:text-red-300 md:hover:bg-red-300 md:hover:text-black cursor-pointer
                      transition-colors duration-200 border border-red-300'onClick={()=>removeList(item._id)}>
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-white text-lg'>No Products Available.</div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  )
}

export default Lists
