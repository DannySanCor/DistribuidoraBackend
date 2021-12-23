import { Document } from "mongoose";

export interface User extends Document
 {
   readonly userName:String;
   readonly firstName:String;    
   readonly lastName:String;  
   readonly emailUser:String;      
   readonly password:String;         
   readonly address:String;        
   readonly phoneNumber:String;
   readonly description:String;
   readonly imageUrl:String;
   readonly tagActive:Number;
   readonly tagDelete:Number;
   readonly createdAt:Date;

 }
 