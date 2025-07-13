import React, { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import Title from '../component/Title';
import axios from 'axios';

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(ShopDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        "https://aimart.onrender.com/api/order/userorder",
        {},
        { withCredentials: true }
      );

      if (result.data && result.data.length > 0) {
        const latestOrder = result.data[result.data.length - 1];

        const allOrderItem = latestOrder.items.map((item) => ({
          ...item,
          status: latestOrder.status,
          payment: latestOrder.payment,
          paymentMethod: latestOrder.paymentMethod,
          date: latestOrder.date,
        }));

        setOrderData(allOrderItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-[99vw] min-h-[100vh] p-4 pb-40 bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <div className="text-center mt-20 mb-6">
        <Title text1="MY" text2="ORDER" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-300 text-lg">No recent orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orderData.map((item, index) => (
            <div key={index} className="bg-[#1e3a3a] rounded-xl shadow-md p-4 hover:scale-[1.01] transition-transform duration-300">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-[110px] h-[110px] object-cover rounded-lg shadow-md"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <h2 className="text-xl font-semibold text-[#e9f9fa]">{item.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-[#aaf4e7]">
                    <p><span className="font-medium text-white">Price:</span> {currency}{item.price}</p>
                    <p><span className="font-medium text-white">Quantity:</span> {item.quantity}</p>
                    <p><span className="font-medium text-white">Size:</span> {item.size}</p>
                  </div>
                  <p className="text-sm text-[#ccefff]">
                    <span className="font-medium text-white">Date:</span> {new Date(item.date).toDateString()}
                  </p>
                  <p className="text-sm text-[#ccefff]">
                    <span className="font-medium text-white">Payment Method:</span> {item.paymentMethod}
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.status === "Delivered" ? 'bg-green-500' : 'bg-green-600'}`}></span>
                    <p className="text-sm md:text-base">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="mt-1 px-4 py-2 bg-[#0c8282] hover:bg-[#2e5151] text-white text-sm md:text-base rounded-lg transition duration-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
