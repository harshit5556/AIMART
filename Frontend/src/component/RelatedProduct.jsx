import React, { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import Title from '../component/Title.jsx';
import Card from '../component/Card.jsx'; 

const RelatedProduct = ({ category, subcategory, currentproductID }) => {
  const { products } = useContext(ShopDataContext);
  const [related, setRelated] = useState([]); 
console.log(products)
  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = products.slice(); 
      productsCopy = productsCopy.filter((item) => item.category === category);
      productsCopy = productsCopy.filter((item) => item.subcategory === subcategory);
      productsCopy = productsCopy.filter((item) => item._id !== currentproductID);
      setRelated(productsCopy.slice(0, 4)); 
    }
  }, [products, category, subcategory, currentproductID]);

  return (
    <div className="my-[130px] md:my-[40px] md:px-[60px]">
      <div className="ml-[20px] lg:ml-[80px]">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="w-full mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
        {related && related.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
