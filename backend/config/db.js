import mongoose from "mongoose";

export const connectionDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URL) 
    console.log("mongodb connected successfully")
  }
  catch(err){
 console.log(err.message)
  }
}