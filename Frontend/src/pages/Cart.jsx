import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { ShopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import CartTotal from './CartTotal';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';
const Cart = () => {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
  const [cartData, setCartdata] = useState([]);
  const [loading ,setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartdata(tempData);
  }, [cartItem]);

  return (
    <div className="w-full min-h-screen p-4 md:p-10 bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <div className="text-center mt-20 mb-10">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="flex flex-col gap-6">
        {cartData.map((item, index) => {
          const productdata = products.find((product) => product._id === item._id);
          if (!productdata) return null;

          return (
            <div
              key={index}
              className="w-full border border-[#9ff9f9] rounded-xl bg-[#51808030] p-4 flex flex-col md:flex-row gap-4 items-center"
            >
              <img
                src={productdata.image1}
                alt={productdata.name}
                className="w-[100px] h-[100px] rounded-md object-cover"
              />
           <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
  <div className="flex flex-col gap-1">
    <p className="text-xl font-semibold">{productdata.name}</p>
    <div className="flex items-center gap-4">
      <p className="text-lg text-[#aaf4e7]">
        {currency} {productdata.price}
      </p>
      <span className="px-3 py-1 bg-[#518080b4] border border-[#9ff9f9] rounded-md text-sm">
        Size: {item.size}
      </span>
    </div>
  </div>

  {/* Centered Qty section */}
  <div className="flex items-center justify-center gap-4 md:ml-auto">
    <label className="text-sm text-gray-300">Qty:</label>
    <input
      type="number"
      min={1}
      value={item.quantity}
      onChange={(e) =>
        updateQuantity(item._id, item.size, parseInt(e.target.value))
      }
      className="w-16 px-2 py-1 border border-[#9ff9f9] bg-transparent rounded-md text-center"
    />
    <RiDeleteBin6Line
      className="text-[#9ff9f9] w-[25px] h-[25px] cursor-pointer hover:text-red-400"
      title="Delete item"
      onClick={() => updateQuantity(item._id, item.size, 0)}
    />
  </div>
</div>

           
            </div>
          );
        })}
      </div>
      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <button
  className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[10px] border border-[#80808049] ml-[30px] mt-[20px]"
  disabled={loading}
  onClick={async () => {
    if (cartData.length > 0) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      setLoading(false);
      navigate("/placeOrder");
    } else {
      toast.warn("Your cart is empty!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }}
>
  {loading ? <Loading className="w-5 h-5 animate-spin" /> : "PROCEED TO CHECKOUT"}
</button>

        </div>
      </div>
    </div>
  );
};

export default Cart;
