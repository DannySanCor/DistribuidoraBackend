import { Column, PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert,BeforeUpdate, Entity, ObjectIdColumn } from "typeorm";
import {hash} from "bcrypt";
import { ObjectId } from "mongoose";

@Entity('users')
export class User{
    
    @ObjectIdColumn()
    id: ObjectId;
    @Column()
    
    userName:String;
    @Column()
    firstName:String;
    @Column()
    lastName:String;
    @Column()
    emailUser:String;
    @Column()
    password:String;
    @Column()
    address:String;
    @Column()
    phoneNumber:String;
    @Column()
    description:String;
    @Column()
    imageUrl:String;
    @Column()
    tagActive:Number;
    @Column()
    tagDelete:Number;
    @Column()
    createdAt:Date;
    






}

/*  userName:{type: String, required:true},
    firstName:{type: String, required:true},
     lastName:{type: String, required:true},
     emailUser:{type: String, required:true},
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
}); */