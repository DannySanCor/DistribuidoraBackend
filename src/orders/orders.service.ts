import { Injectable,NotFoundException } from '@nestjs/common';
import {Order} from './interfaces/order.interface'
import { Model ,ObjectId} from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<Order>
        ){
    
      }
      async getOrders(): Promise <any>
    {
      //const Orders =  await this.orderModel.find().populate('Socio').populate('User').exec();
      const Orders =  await this.orderModel.find().populate({ path: 'idPartner', select: 'partnerName',strictPopulate:false});
      console.log(Orders);
     
    return Orders;
    }
   
    async getOrder(orderId?:any):Promise<any>
    {
        const Order:any = await this.orderModel.findById(orderId);
        return Order;
    }
    async createOrder(CreateOrderDTO:CreateOrderDTO):Promise<Order>
    {
        const Order =  new this.orderModel(CreateOrderDTO);
        return await Order.save();
         
    }
   async deleteOrder(orderId: ObjectId): Promise<Order>
    {
      const deletedOrder = await this.orderModel.findByIdAndDelete(orderId)
      return deletedOrder;
    }
    async updateOrder(orderId:any, CreateOrderDTO:CreateOrderDTO):Promise<any>
    {
      console.log("llego a service");
       const updateOrder = await this.orderModel.findByIdAndUpdate(orderId,CreateOrderDTO,{new:true});
       return updateOrder;
    }
    async findOne(orderId: ObjectId): Promise<any | undefined> {
      
      let order:any = await this.orderModel.findOne({"_id": orderId});
      //console.log(user);
      if(!order) throw new NotFoundException('Usuario no registrado')
      return order;
    }
}
