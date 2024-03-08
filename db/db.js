import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

let mongourl = process.env.mongourl;

export default async function connectDB(){
    try{
        let connectdatabase = await mongoose.connect(mongourl);
      
        console.log('database connnected');
    }catch(err){
        console.log(`Error in connectiong DB ${err}`);
    }
} 