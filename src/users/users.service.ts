
import { Injectable,Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param ,NotFoundException, Query } from '@nestjs/common';
import { User } from '././interfaces/user.interface';

import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDTO } from './dto/user.dto';
// This should be a real class/interface representing a user entity


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
    ){

  }
  
  async getUsers(): Promise <User[]>
    {
      const Users =  await this.userModel.find()
    return Users;
    }
    async getLastUser(): Promise <User[]>
    {
      const User =  await this.userModel.find().limit(1).sort({$natural:-1});
    return User;
    }
    async getUser(userId?:string):Promise<User>
    {
        const User = await this.userModel.findById(userId);
        return User;
    }
    async createUser(CreateUserDTO:CreateUserDTO):Promise<User>
    {
        const User =  new this.userModel(CreateUserDTO);
        return await User.save();
         
    }
   async deleteUser(UserID: string): Promise<User>
    {
      const deletedUser = await this.userModel.findByIdAndDelete(UserID)
      return deletedUser;
    }
    async updateUser(UserID:string, CreateUserDTO:CreateUserDTO):Promise<User>
    {
       const updateUser = await this.userModel.findByIdAndUpdate(UserID,CreateUserDTO,{new:true});
       return updateUser;
    }
    async findOne(username: string): Promise<User | undefined> {
      
      let user:any = await this.userModel.findOne({"userName": username});
      //console.log(user);
      if(!user) throw new NotFoundException('Usuario no registrado')
      return user;
    }
}