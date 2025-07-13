import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setsearch] = useState('');
  const [showsearch, setshowsearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);

  const userData = true;

  const currency = '₹';
  const delivery_fee = 40;

  const getProducts = async () => {
    try {
      let result = await axios.get('http://localhost:8000/api/product/list');
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error('Select a product size');
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);

    if (userData) {
      try {
        setLoading(true);
        await axios.post(
          'http://localhost:8000/api/cart/add',
          { itemId, size },
          { withCredentials: true }
        );
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        'http://localhost:8000/api/cart/get',
        {},
        { withCredentials: true }
      );
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const qty = parseInt(quantity); 
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = qty;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          'http://localhost:8000/api/cart/update',
          { itemId, size, quantity: qty },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getcount = () => {
    let totalcnt = 0;
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        const quantity = parseInt(cartItem[productId][size]);
        if (!isNaN(quantity)) {
          totalcnt += quantity;
        }
      }
    }
    return totalcnt;
  };
  
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let iteminfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += iteminfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProducts();
    getUserCart();
  }, []);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setsearch,
    showsearch,
    setshowsearch,
    cartItem,
    getcount,
    addtocart,
    setCartItem,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContext;
