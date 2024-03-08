import mongoose from "mongoose";

const restdata = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:20},
    age:{type:Number,
        required:true,
        min:18,
        max:80},
        email:{type:String},
        phone:{type:Number},
});

const userData = mongoose.model('restdata', restdata);
export {userData};
