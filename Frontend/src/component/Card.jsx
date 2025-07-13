import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom';

const Card = ({ name, image, id, price }) => {
  const { currency } = useContext(ShopDataContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] 
        flex flex-col p-[10px] cursor-pointer border border-[#80808049] transition-transform"
      onClick={() => navigate(`/ProductDetails/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-[250px] rounded-sm object-cover"
      />

      <div className="flex flex-col justify-between flex-grow w-full overflow-hidden mt-2">
        <div className="text-[#c3f6fa] text-[16px] font-medium leading-5 line-clamp-2">
          {name}
        </div>
        <div className="text-[#c3f6fa] text-[18px] font-semibold mt-auto">
          {currency} {price}
        </div>
      </div>
    </div>
  );
};

export default Card;
