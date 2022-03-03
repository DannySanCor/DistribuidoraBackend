import { Document, ObjectId } from 'mongoose';

export interface User extends Document {
  readonly _id: ObjectId;
  readonly userName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly emailUser: string;
  password: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly tagActive: number;
  readonly tagDelete: number;
  readonly createdAt: Date;
  readonly rol: number;
}
