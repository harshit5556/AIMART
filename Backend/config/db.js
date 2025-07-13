import mongoose  from "mongoose";
const connectDB = async ()=>{
    try{
await mongoose.connect(process.env.MONGODB_URL)
 console.log("DB Connection successfuly");
    }   
    catch{
        console.log("DB ERROR");
    }
}
export default connectDB;