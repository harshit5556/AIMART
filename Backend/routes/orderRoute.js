import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { PlaceOrder, UpdateStatus, userOrder, allOrders, PlaceOrderRazorpay, verifyrazorpay } from '../controllers/orderController.js';
import AdminAuth from '../middleware/AdminAuth.js';
const orderRoute = express.Router();
// for user
orderRoute.post("/placeorder",isAuth , PlaceOrder)
orderRoute.post("/userorder",isAuth , userOrder)
//for payment razorpay 

orderRoute.post("/razorpay",isAuth , PlaceOrderRazorpay)
// verify payment
orderRoute.post("/verifyrazorpay",isAuth , verifyrazorpay)
// for admin
orderRoute.post("/list", AdminAuth,  allOrders)
orderRoute.post("/status", AdminAuth, UpdateStatus)

export default orderRoute