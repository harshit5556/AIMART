import React, { useContext, useState } from 'react'
import Title from "../component/Title"
import CartTotal from "../pages/CartTotal"
import razorpay from "../assets/razorpay.png"
import { ShopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';


const PlaceOrder = () => {
  let [method, setMethod] = useState('cod')
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee ,  products } = useContext(ShopDataContext)
  let [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    country:'',
    phone:'',
    pinCode: '',

  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data, [name]:value}))

  }
// make a init function
const initpay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    handler: async function (response) { // ✅ made async
      console.log('Payment Success:', response);
      try {
        const { data } = await axios.post("https://aimart.onrender.com/api/order/verifyrazorpay", response, { withCredentials: true });
        if (data) {
          navigate("/order");
          setCartItem({});
        }
      } catch (error) {
        console.log("Verification Failed:", error);
      }
    },
    theme: {
      color: '#3399cc',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


 const onSubmitHandler = async (e) =>{
  e.preventDefault();
  setLoading(true);
  try{
   let orderItems = []
   // first loop - id a gi
   // second loop = name  a gya
   for(const items in  cartItem){
    for(const item in  cartItem[items]){
      if( cartItem[items][item]>0){
        const iteminfo = structuredClone(products.find(product=>product._id === items ))
        if(iteminfo){
          iteminfo.size =item
          iteminfo.quantity =  cartItem[items][item]
          orderItems.push(iteminfo)
        }
      }
    }
   }
   // place amount wale controller ko = address , items, amount ye dene wale hai
   let orderData = {
    address: formData,
    items: orderItems,
    amount:  getCartAmount() + delivery_fee
   }
   // make function for cod (place order for cod)
   switch(method){
    case 'cod' :
      const result = await axios.post("https://aimart.onrender.com/api/order/placeorder" ,orderData, {withCredentials :true})
      console.log(result.data);
      toast.success("Order placed successfully!");
      console.log("Payment Success")
      if(result.data){
       setCartItem({});
        navigate("/order");
      //  navigate("/login");
      } else {
        console.log(result.data?.message || "Order placement failed");
        toast.error(result.data?.message || "Order placement failed");
      }
      break;
     case 'razorpay' :
     const resultrazorpay = await axios.post("https://aimart.onrender.com/api/order/razorpay" , orderData , {withCredentials:true})
     if(resultrazorpay.data){
      toast.info("Redirecting to Razorpay...");
      initpay(resultrazorpay.data)
     }

     break;
    default:
      toast.warn("Please select a payment method");
    break;
  }
}
  catch(error){
console.log(error);
toast.error("Something went wrong while placing the order");
  }finally {
    setLoading(false);
  }
  }
  return (
    <div className='w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>

      {/* Form Section */}
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]'>
        <form action="" className='lg:w-[70%] w-[95%] bg-[#1e1e1e] p-[20px] rounded-xl shadow-lg'>
          <div className='py-[40px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='flex gap-[4%] mb-[20px]'>
            <input type="text" placeholder="First Name" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'firstName' value = {formData.firstName}/>
            <input type="text" placeholder="Last Name" className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name= 'lastName' value = {formData.lastName}/>
          </div>

          <div className='mb-[20px]'>
            <input type="email" placeholder="Email Address" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required onChange={onChangeHandler} name= 'email' value = {formData.email} />
          </div>

          <div className='mb-[20px]'>
            <input type="text" placeholder="Street Address" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'street' value = {formData.street} />
          </div>

          <div className='mb-[20px]'>
            <input type="text" placeholder="City" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'city' value = {formData.city}/>
          </div>

          <div className='mb-[20px] '>
            <input type="tel" placeholder="pinCode" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'pinCode' value = {formData.pinCode} />
          </div>
      
          <div className='mb-[20px]'>
            <input type="text" placeholder="State" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'state' value = {formData.state} />
          </div>
          
      

          <div className='mb-[20px]'>
            <input type="text" placeholder="Country" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'country' value = {formData.country} />
          </div>

          <div className='mb-[20px]'>
            <input type="tel" placeholder="Phone Number" className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder-white text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]' required  onChange={onChangeHandler} name= 'phone' value = {formData.phone} />
          </div>
          
        </form>
      </div>

      {/* Cart + Payment Section */}
      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[20px] flex-col py-[20px]'>

          {/* CartTotal with padding */}
          <div className='w-full p-5 rounded-xl shadow-md'>
            <CartTotal />
          </div>

          {/* Payment Title */}
          <div className='py-[30px]'>
            <Title text1={'PAYMENT'} text2={'INFORMATION'} />
          </div>

          {/* Payment Buttons */}
          <div className='w-[100%] flex flex-col lg:flex-row items-center justify-center gap-[20px]'>
            <button 
              type="button"
              onClick={() => setMethod('razorpay')}
              className={`w-[180px] h-[60px] flex items-center justify-center rounded-md border-2 ${method === 'razorpay' ? 'border-green-400' : 'border-transparent'} bg-slate-800 hover:border-green-500  transition-all`}
            >
              <img src={razorpay} className='w-[80%] h-[80%] object-contain ' alt="Razorpay" />
            </button>

            <button 
              type="button"
              onClick={() => setMethod('cod')}
              className={`w-[180px] h-[60px] text-white text-md font-semibold rounded-md border-2 ${method === 'cod' ? 'border-green-400' : 'border-transparent'} bg-slate-800 hover:border-green-500 transition-all`}
            >
              CASH ON DELIVERY
            </button>
          </div>

          {/* Place Order Button */}
          <button
  type="button"
  disabled={loading}
  className={`mt-[20px] text-white text-lg font-semibold px-[30px] py-[12px] rounded-lg shadow-md transition-all duration-300 ${
    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
  }`}
  onClick={onSubmitHandler}
>
  {loading ? <Loading className="w-5 h-5 animate-spin" /> : 'Place Order'}
</button>

        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
