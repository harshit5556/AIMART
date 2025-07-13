import order from "../models/orderModel.js";
import Order from "../models/orderModel.js";
import User from "../models/usermodels.js";
import dotenv from 'dotenv'
import razorpay from 'razorpay'
dotenv.config();
const currency = 'inr'

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const PlaceOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid or empty items array" });
    }

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (!address || typeof address !== 'object') {
      return res.status(400).json({ message: "Invalid address" });
    }

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(201).json({ message: "Order Placed" });
  } catch (error) {
    console.error("Order place error:", error);
    return res.status(500).json({ message: "Order place error", error: error.message });
  }
};

//function for placeorder razorpay

export const PlaceOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!Array.isArray(items) || !amount || !address || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const orderData = {
      items,
      amount,
      userId,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const razorpayOrder = await instance.orders.create(options); 
    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error("🔥 Razorpay error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const verifyrazorpay = async (req,res) =>{
  try{
 const userId = req.userId
 const {razorpay_order_id} = req.body;
 const orderinfo = await instance.orders.fetch(razorpay_order_id)
 if(orderinfo.status ==='paid'){
await Order.findByIdAndUpdate(orderinfo.receipt, {payment:true});
await User.findByIdAndUpdate(userId , {cartData:{}})
res.status(200).json({message:'Payment Successful'})
 }
 else{
  res.json({message:'Payment failed'})
 }
  }
  catch(error){
console.log(error);
return res.status(500).json({message:error.message})
  }
}



//make function for user 
export const userOrder = async (req,res) =>{
    try{
    const userId = req.userId
    const orders = await Order.find({userId})
    return res.status(200).json(orders)
    }
    catch(error){
       console.log(error)
       return res.status(500).json({message :"userOrder error"})
    }
}


// make function for a admin
export const allOrders = async (req,res) =>{
  try{
    const {orderId ,status} = req.body
  const orders = await Order.find({})
  res.status(200).json(orders); 
  }
  catch(error){
  console.log(error)
  return res.status(500).json({message : "adminAllOrder Error"})
  }
}

export const UpdateStatus  = async (req,res) =>{
  try{
    const {orderId ,status} = req.body
    await Order.findByIdAndUpdate(orderId , {status})
    return res.status(201).json({message :'status Update'})
  }
  catch(error){
return res.status(500).json({message : error.message})
  }
}