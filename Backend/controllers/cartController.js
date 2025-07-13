import User from "../models/usermodels.js";

export const addtocart = async (req,res) =>{
try{
const {itemId, size} = req.body;
const userData = await User.findById(req.userId)
// chk user exist
if(!userData){
    return res.status(404).json({message:"User Not Found"});
}
// Ensure cartdata
let cartData = userData.cartData || {};
if(cartData[itemId]){
    if(cartData[itemId][size]){
        cartData[itemId][size] +=1;
    }
    else{
        cartData[itemId][size] =1;
    }
}
else{
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
}
await User.findByIdAndUpdate(req.userId , { cartData });
return res.status(201).json({message :"Add to cart"})
}
catch(error){
console.log(error)
return res.status(500).json({message :"Add to cart error"});
}
}

export const UpdateCart = async (req , res) =>{
    try{
  const  {itemId , size , quantity} = req.body;
  const userData = await User.findById(req.userId)
  let cartData = await userData.cartData;

  cartData[itemId][size] = quantity

  await User.findByIdAndUpdate(req.userId, { cartData })

  return res.status(201).json({message: "cart update"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message :"Update error"});
    }
}


export const getUserCart = async (req , res) =>{
    try{
   const userData = await User.findById(req.userId)
   let cartData = await userData.cartData;
   return res.status(200).json(cartData)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message :"getUserCart Error"})
    }
}