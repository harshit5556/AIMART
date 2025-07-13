import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authroute.js';
import userRoute from './routes/userRouter.js';
import productrouth from './routes/productrouth.js';
import cors from "cors"
import cartRoutes from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js'
dotenv.config();
let app  = express();

let PORT = process.env.PORT||6000;
app.get("/",(req,res)=>{
    res.send("hello baccho");
});

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
  });
//create a middle ware 
app.use(express.json())
app.use(cookieParser()) 
app.use(cors({
    origin:["https://aimart-frontend.onrender.com","https://aimart-adminp.onrender.com"],
    credentials:true

}))
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoute)
app.use("/api/product",productrouth)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoute)

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
connectDB();
})
