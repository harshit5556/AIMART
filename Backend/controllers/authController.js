import User from "../models/usermodels.js";
import validator from "validator"
import bcrypt, { compareSync } from "bcryptjs"
import {genToken, genTokenA} from "../config/token.js"

export const registration = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
   
      // Proper field presence check
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, Email, and Password are required" });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      if (password.length < 8) {
        return res.status(400).json({ message: "Password length must be at least 8 characters" });
      }
  
      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({ message: "User already exists" });
   
    }
  
      let hashpassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashpassword });
  
      let token = await genToken(user._id);
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
     return res.status(201).json(user);
    } catch (error) {
        console.log("registration error")
     return  res.status(500).json({message:`registration error ${error}`});
    }

  };

  // Create a login page
  export const login = async (req,res) =>{
  try{
  let {email,password}  = req.body;
  let user = await User.findOne({email});
  if(!user){
    return res.status(404).json({message:"User is not found"});
  }
  let ismatch = await bcrypt.compare(password,user.password)
  if(!ismatch){
    return res.status(404).json({message:"Incorrect Password"});
  }
  let token = await genToken(user._id);
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
      });
  
      return res.status(201).json({message:`login Successfully`});
  }
  catch(error){
 console.log("login error");
 return  res.status(500).json({message:`login error ${error}`});
  }
  }
  
  // create a logout page
  export const logout = async (req,res) => {
   try{
     res.clearCookie("token")
     return res.status(200).json({message:"logout successfuly"})
   }
   catch(error){
    console.log("logout error");
    return  res.status(500).json({message:`logout error ${error}`});
   }
  }
//create  a Google login page
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      const fakePassword = await bcrypt.hash(email + Date.now(), 10); // generate a placeholder password
      user = await User.create({ name, email, password: fakePassword });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: `googleLogin Successfully` });

  } catch (error) {
    console.log("googleLogin Error:", error.message);
    return res.status(500).json({ message: `googleLogin error: ${error.message}` });
  }
};

// creat a auth controller  for a admin
export const adminlogin = async (req,res)=>{
  try{
    let {email , password} = req.body;
    if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      let token = await genTokenA(email);
// generate token for a admin
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json(token)
    }
    return res.status(400).json({message:"Invaild Creadintials"})
  }
  catch(error){
    console.log(error)
    return res.status(500).json({message:"Adminlogin error"});
  }
} 