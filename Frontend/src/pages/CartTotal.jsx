import React, { useContext } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import Title from '../component/Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full lg:ml-8 mt-10 lg:mt-0 text-white">
      <div className="text-xl mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="border-2 border-[#4d8890] rounded-xl p-6 bg-[#2d3d3d8e] shadow-md flex flex-col gap-4 text-sm">
        <div className="flex justify-between text-lg">
          <p className="text-gray-300">Subtotal</p>
          <p className="text-white">
            {currency} {subtotal}.00
          </p>
        </div>

        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-lg">
          <p className="text-gray-300">Shipping Fee</p>
          <p className="text-white">
            {currency} {delivery_fee}
          </p>
        </div>

        <hr className="border-[#4d8890]" />

        <div className="flex justify-between text-xl font-semibold mt-2">
          <p className="text-white">Total</p>
          <p className="text-green-300">
            {currency} {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
