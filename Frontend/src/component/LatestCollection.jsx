import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopDataContext } from '../context/ShopContext';
import Card from './Card';
const LatestCollection = () => {
    let {products} = useContext(ShopDataContext)
    let [latestProducts, setLatestProducts]  =  useState([]);
    
    useEffect(()=>{
 setLatestProducts(products.slice(0,8));
    },[products])
  return (
    <div>
    <div className="w-full text-center mt-[30px] md:mt-[50px]">
      <Title text1="LATEST" text2="COLLECTIONS" />
      <p className="w-full max-w-[700px] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 mt-[10px]">
        Step Into Style — New Collections Dropping This Season!
      </p>
    </div>
    <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
    {
    latestProducts.map((item,index)=>(
        <Card key = {index} name = {item.name} image = {item.image1} id = {item._id} price= {item.price} />
    ))
    }
    </div>
    </div>
  );
};

export default LatestCollection;
