import React, { useState, useEffect } from 'react'
import Nav from '../component/Nav.jsx'
import Sidebar from '../component/Sidebar.jsx'
import axios from 'axios'

const Home = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchcount = async () => {
    try {
      const product = await axios.get("https://aimart.onrender.com/api/product/list", { withCredentials: true })
      setTotalProduct(product.data.length)

      const orders = await axios.post("https://aimart.onrender.com/api/order/list", {}, { withCredentials: true })
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  }

  useEffect(() => {
    fetchcount()
  }, [])

  return (
    <div className='w-full h-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white'>
      <Nav />
      <Sidebar />

      <div className='md:ml-[20%] w-full md:w-[80%] px-6 py-20'>
        <h1 className='text-4xl font-bold mb-10 text-[#afe2f2]'>AIMART Admin Panel</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Total Products Card */}
          <div className='bg-[#101d1f] rounded-xl shadow-lg p-6 border border-[#1e2f31] hover:scale-[1.02] transition-transform'>
            <h2 className='text-2xl font-semibold mb-4'>Total Number of Products</h2>
            <p className='text-4xl bg-[#030e11] rounded-md py-4 text-center font-bold border border-[#2c3d3f]'>
              {totalProduct}
            </p>
          </div>

          {/* Total Orders Card */}
          <div className='bg-[#101d1f] rounded-xl shadow-lg p-6 border border-[#1e2f31] hover:scale-[1.02] transition-transform'>
            <h2 className='text-2xl font-semibold mb-4'>Total Number of Orders</h2>
            <p className='text-4xl bg-[#030e11] rounded-md py-4 text-center font-bold border border-[#2c3d3f]'>
              {totalOrders}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
