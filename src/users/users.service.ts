import {
  Injectable,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { User } from '././interfaces/user.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dto/user.dto';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    const Users = await this.userModel.find({}, { password: 0 });
    console.log(Users);

    return Users;
  }
  async getLastUser(): Promise<User[]> {
    const User = await this.userModel
      .find({}, { password: 0 })
      .limit(1)
      .sort({ $natural: -1 });
    return User;
  }
  async getUser(userId?: any): Promise<any> {
    const User: any = await this.userModel.findById(userId, { password: 0 });
    return User;
  }
  async createUser(CreateUserDTO: CreateUserDTO): Promise<any> {
    const User = new this.userModel(CreateUserDTO);
    try {
      await User.save();

      return User;
    } catch (error) {
      console.log('entro al error');
      console.error(error);
      return error;
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  }
  async deleteUser(UserID: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(UserID);
    return deletedUser;
  }
  async updateUser(UserID: any, CreateUserDTO: CreateUserDTO): Promise<any> {
    console.log('llego a service');
    const updateUser = await this.userModel.findByIdAndUpdate(
      UserID,
      CreateUserDTO,
      { new: true },
    );
    return updateUser;
  }
  async findOne(username: string): Promise<any | undefined> {
    const user: any = await this.userModel.findOne({ userName: username });
    //console.log(user);
    if (!user) throw new NotFoundException('Usuario no registrado');
    return user;
  }
  async findOnebyEmail(email: string): Promise<any | undefined> {
    const user: any = await this.userModel.findOne({ emailUser: email });
    //console.log(user);
    if (!user) throw new NotFoundException('Usuario no registrado');
    return user;
  }
}
