import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Nav from '../component/Nav';
import upload from '../assets/update.jpg';
import axios from 'axios';
import Loading from '../component/Loding';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [Price, setPrice] = useState('');
  const [subCategory, setSubCategory] = useState('TopWear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading , setLoading] = useState(false);
  const handleAddProduct = async (e) => {
        setLoading(true); 
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", Description); 
      formData.append("price", Price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      
      // Append files only if they exist
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      };
  
      const { data } = await axios.post(
        "http://localhost:8000/api/product/addproduct", 
        formData, 
        config
      );
     setLoading(false)

      toast.success("Product added successfully!");

      
      setName("");
      setDescription("");
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setPrice("");
      setBestseller(false);
      setCategory("Men");
      setSubCategory("TopWear");
      setSizes([]);
  
    } catch (error) {
     
     setLoading(false);
      alert(error.response?.data?.message || "Failed to add product");
      toast.error(error.response?.data?.message || "Failed to add product");

    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav />
      <Sidebar />

      <div className='w-[82%] h-full flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[2%]'>
        <form
          onSubmit={handleAddProduct}
          className='w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[25px] px-[30px] md:px-[60px]'
        >
          <div className='text-[25px] md:text-[40px] font-bold py-4'>Add Product Page</div>

          {/* Upload Images */}
          <div className='w-[80%] flex flex-col gap-[10px] mt-[20px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Upload Images</p>
            <div className='flex gap-4 flex-wrap'>
              {[image1, image2, image3, image4].map((img, index) => (
                <label
                  key={index}
                  htmlFor={`image${index + 1}`}
                  className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]'
                >
                  <img
                    src={!img ? upload : URL.createObjectURL(img)}
                    alt=""
                    className='w-[70%] h-[70%] rounded-lg shadow-2xl border-[2px] hover:border-[#1d1d1d]'
                  />
                  <input
                    type="file"
                    id={`image${index + 1}`}
                    name={`image${index + 1}`}
                    hidden
                    required={index === 0}
                    onChange={(e) => {
                      const setter = [setImage1, setImage2, setImage3, setImage4];
                      setter[index](e.target.files[0]);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
            <input
              type="text"
              placeholder='Type here'
              className='w-full max-w-[600px] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7] cursor-pointer'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Product Description */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
            <textarea
              placeholder='Type here'
              className='w-full max-w-[600px] h-[20vh] rounded-lg border-[2px] bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7] cursor-pointer'
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Category & SubCategory */}
          <div className='w-[90%] flex flex-wrap gap-[10px]'>
            <div className='md:w-[30%] w-full flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
              <select
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] hover:border-[#46d1f7]'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div className='md:w-[30%] w-full flex flex-col gap-[10px]'>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub Category</p>
              <select
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg border-[2px] hover:border-[#46d1f7]'
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className='w-[80%] flex flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
            <input
              type="number"
              placeholder='₹ 2000'
              className='w-full max-w-[600px] h-[40px] rounded-lg border-[2px] bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] hover:border-[#46d1f7] cursor-pointer'
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Product Sizes */}
          <div className='w-[80%] flex flex-col gap-[10px] py-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex flex-wrap gap-[15px]'>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`px-[20px] py-[10px] rounded-xl text-[18px] text-black font-semibold border-[2px] shadow-md transition-all duration-300 
                    cursor-pointer select-none
                    ${sizes.includes(size)
                      ? "bg-gradient-to-r from-green-300 to-green-500 text-black border-green-700 shadow-lg scale-105"
                      : "bg-slate-700 text-white hover:border-[#46d1f7] hover:shadow-lg hover:scale-105"}`}
                  onClick={() =>
                    setSizes(prev =>
                      prev.includes(size)
                        ? prev.filter(item => item !== size)
                        : [...prev, size]
                    )
                  }
                  title="Click to select/deselect"
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* BestSeller */}
          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[50px]'>
            <input 
              type="checkbox" 
              id="bestseller-checkbox" 
              className='w-[15px] h-[15px] cursor-pointer' 
              onChange={() => setBestseller(prev => !prev)} 
              checked={bestseller}
            />
            <label htmlFor="bestseller-checkbox" className='text-[18px] md:text-[22px] font-semibold'>
              Add to BestSeller
            </label>
          </div>

          {/* Submit Button */}
          <button
  type="submit"
  className="w-[200px] py-[10px] bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg transition-all cursor-pointer flex items-center justify-center"
>
  {loading ? (
    <Loading className="w-6 h-6 animate-spin" />
  ) : (
    "Add Product"
  )}
</button>

        </form>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Add;
