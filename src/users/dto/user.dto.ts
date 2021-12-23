export class CreateUserDTO
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
   public tagActive:Number;
   public tagDelete:Number;
   readonly createdAt:Date;
}