import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopDataContext } from '../context/ShopContext';
import { IoStar } from "react-icons/io5";
import { FaStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';
const ProductDetails = () => {
  const { productId } = useParams();
  const { products, currency, addtocart } = useContext(ShopDataContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [loading ,setLoading] = useState(false)
  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image1);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="text-3xl text-white bg-red-600 p-10 text-center">
        Loading product details...
      </div>
    );
  }

  const { name, price, description, image1, image2, image3, image4, sizes, category, subcategory, _id } = productData;

  return (
    <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      {/* MAIN PRODUCT DISPLAY */}
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto p-6 pt-10">
        {/* Thumbnails */}
        <div className="flex lg:flex-col flex-row gap-4 py-8">
          {[image1, image2, image3, image4].map((img, i) => (
            <div key={i} className="w-[70px] h-[100px] bg-white rounded shadow-md border overflow-hidden">
              <img
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setImage(img)}
                className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={image}
            alt="Selected Product"
            className="w-full max-w-sm h-auto rounded-xl shadow-xl object-cover py-9"
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-[45%] space-y-4 py-8">
          <h1 className="text-4xl font-bold tracking-wide">{name.toUpperCase()}</h1>

          <div className="flex items-center gap-1">
            <IoStar className="text-yellow-400 text-xl" />
            <IoStar className="text-yellow-400 text-xl" />
            <IoStar className="text-yellow-400 text-xl" />
            <IoStar className="text-yellow-400 text-xl" />
            <FaStarHalfStroke className="text-yellow-400 text-xl" />
            <span className="text-lg font-medium pl-2">(124 reviews)</span>
          </div>

          <p className="text-3xl font-semibold text-green-300">{currency} {price}</p>

          <p className="text-lg text-gray-300 leading-relaxed">
            {description}. Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Size Selection */}
          <div className="mt-6">
            <p className="text-xl font-semibold mb-2">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {sizes?.map((item, index) => (
                <button
                  key={index}
                  className={`py-2 px-5 rounded-md border font-medium transition-all duration-200
                  ${item === size
                    ? 'bg-green-300 text-black border-green-500 shadow-lg scale-105'
                    : 'bg-slate-200 text-gray-700 hover:bg-slate-300'}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Add to Cart */}
            <button
  className={`text-[16px] active:bg-slate-500 cursor-pointer py-2 px-6 rounded-2xl mt-5 border border-[#80808049] text-white shadow-md shadow-black 
  ${!size ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#495b61c9] hover:bg-[#5e767dcc]'}`}
  disabled={!size}
  onClick={() => {
    if (size) {
      setLoading(true);
      addtocart(productData._id, size);
      toast.success("Product added to cart");
      setLoading(false);
    } else {
      toast.warn("Please select a size");
    }
  }}
>
  {loading ? <Loading className="w-5 h-5 animate-spin"/> : "Add to Cart"}
</button>

          </div>

          {/* Info */}
          <div className="w-[90%] h-[1px] bg-slate-700 my-4"></div>

          <div className="w-[90%] text-sm space-y-1">
            <p>✅ 100% Original Product</p>
            <p>🚚 Cash on Delivery available</p>
            <p>🔁 Easy Return & Exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION & REVIEW SECTION */}
      <div className="w-full min-h-[60vh] flex flex-col items-center mt-6 px-6">
        <div className="flex gap-4 border-b border-gray-500 mb-6">
          <button
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === 'description' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === 'reviews' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-300'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="w-full max-w-5xl text-gray-300">
          {activeTab === 'description' && (
            <div className="text-lg leading-relaxed">
              <p className="mb-4">
                This premium cotton shirt blends comfort and elegance. Designed for daily wear, it offers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>High-quality breathable cotton fabric</li>
                <li>Slim modern fit with durable stitching</li>
                <li>Fade-resistant colors and soft feel</li>
                <li>Perfect for casual or semi-formal wear</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="bg-[#1f2d32] p-4 rounded shadow-md">
                <p className="font-semibold text-white">Ayush T.</p>
                <p className="text-sm text-yellow-300">★★★★★</p>
                <p className="text-sm mt-1">Great quality and very comfortable. Totally worth the price.</p>
              </div>
              <div className="bg-[#1f2d32] p-4 rounded shadow-md">
                <p className="font-semibold text-white">Sneha K.</p>
                <p className="text-sm text-yellow-300">★★★★☆</p>
                <p className="text-sm mt-1">Loved the material, would buy again in another color.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      <RelatedProduct
        category={category}
        subcategory={subcategory}
        currentproductID={_id}
      />
    </div>
  );
};

export default ProductDetails;
