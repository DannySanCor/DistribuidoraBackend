
import { Schema } from "mongoose";
import { Any } from "typeorm";

export const UserSchema = new Schema({
     userName:{type: String, required:true},
     firstName:{type: String, required:true},
     lastName:{type: String, required:true},
     emailUser:{type: String, required:true, index:true, unique:true},
     password:{type:String, required:true},
     address:String,
     phoneNumber:Number,
     description:String,
     imageUrl:String,
     createdAt: {
         type: Date,
         default:Date.now
     }, 
     tagActive:Number,
     tagDelete:Number
});



